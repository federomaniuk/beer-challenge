import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProduct } from "../../../hooks/useApi";
import "./ProductDetail.scss";
import DetailsLayout from "../../layouts/DetailsLayout/DetailsLayout";
import ProductDetailsHeader from "../../product/ProductDetails/ProductDetailsHeader";
import ProductDetailsBody from "../../product/ProductDetails/ProductDetailsBody";
import ProductDetailsFooter from "../../product/ProductDetails/ProductDetailsFooter";

const ProductDetail = () => {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const productId = productSlug.split("-")[0];
  const { product, loading, error } = useProduct(productId);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (product && product.skus && product.skus.length > 0 && !selectedSize) {
      setSelectedSize(product.skus[0].code);
    }
  }, [product, selectedSize]);

  if (loading) {
    return <div className="product-detail__loading">Loading...</div>;
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

          <ProductDetailsFooter />
        </div>
      </div>
    </DetailsLayout>
  );
};

export default ProductDetail;
