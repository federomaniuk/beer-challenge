import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct, useStockPrice } from "../../../hooks/useApi";
import "./ProductDetail.scss";
import DetailsLayout from "../../layouts/DetailsLayout/DetailsLayout";
import ProductDetailsHeader from "../../product/ProductDetails/ProductDetailsHeader";
import ProductDetailsBody from "../../product/ProductDetails/ProductDetailsBody";
import ProductDetailsFooter from "../../product/ProductDetails/ProductDetailsFooter";
import { useFormat } from "../../../hooks/useFormat";
import DetailsSkeleton from "../../skeletons/DetailsSkeleton.jsx/DetailsSkeleton";

const ProductDetail = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const productId = productSlug.split("-")[0];
  const { product: originalProduct, loading, error } = useProduct(productId);
  const { getStockPrices } = useStockPrice();
  const [selectedSize, setSelectedSize] = useState(null);
  const [product, setProduct] = useState(null);
  const { formatPrice } = useFormat();

  useEffect(() => {
    if (originalProduct) {
      setProduct(originalProduct);
    }
  }, [originalProduct]);

  useEffect(() => {
    if (product && product.skus && product.skus.length > 0 && !selectedSize) {
      setSelectedSize(product.skus[0].code);
    }
  }, [product, selectedSize]);

  useEffect(() => {
    const updateStockPrices = async () => {
      if (product && product.skus) {
        const skuCodes = product.skus.map((sku) => sku.code);
        const stockData = await getStockPrices(skuCodes);

        setProduct((prevProduct) => ({
          ...prevProduct,
          skus: prevProduct.skus.map((sku) => {
            const stockInfo = stockData.find((item) => item.sku === sku.code);
            return {
              ...sku,
              price: stockInfo ? stockInfo.price : sku.price,
              stock: stockInfo ? stockInfo.stock : sku.stock,
            };
          }),
        }));
      }
    };

    if (product) {
      const interval = setInterval(updateStockPrices, 5000);
      return () => clearInterval(interval);
    }
  }, [product, getStockPrices]);

  if (loading) {
    return (
      <DetailsLayout>
        <DetailsSkeleton />
      </DetailsLayout>
    );
  }

  if (error || !product) {
    return (
      <div className="product-detail__error">
        <h2>Product Not Found</h2>
        <p>{error || "The product you are looking for does not exist."}</p>
        <button onClick={() => navigate("/products")}>Back to Products</button>
      </div>
    );
  }

  const getMainSku = () => {
    return product.skus && product.skus.length > 0 ? product.skus[0] : null;
  };

  const getSelectedSku = () => {
    if (!selectedSize || !product.skus) return getMainSku();
    return (
      product.skus.find((sku) => sku.code === selectedSize) || getMainSku()
    );
  };

  const currentSku = getSelectedSku();

  const addToCart = () => {
    const selectedSku = getSelectedSku();
    window.alert(
      `Added ${product.brand} (${
        selectedSku?.name
      }) to cart | Total: ${formatPrice(selectedSku?.price || 0)}`
    );
  };

  return (
    <DetailsLayout>
      <div className="product-detail">
        <div className="product-detail__image-container">
          <img src={product.image} alt={product.brand} />
        </div>

        <div className="product-detail__content">
          <ProductDetailsHeader product={product} currentSku={currentSku} />

          <ProductDetailsBody
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />

          <ProductDetailsFooter addToCart={addToCart} />
        </div>
      </div>
    </DetailsLayout>
  );
};

export default ProductDetail;
