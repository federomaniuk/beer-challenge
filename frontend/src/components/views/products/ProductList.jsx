import { useProducts } from "../../../hooks/useApi";
import MainLayout from "../../layouts/MainLayout/MainLayout";
import ProductCard from "../../product/ProductCard/ProductCard";
import ProductListSkeleton from "../../skeletons/ProductListSkeleton.jsx/ProductListSkeleton";
import UserInfo from "../../ui/UserInfo/UserInfo";
import "./ProductList.scss";

const ProductList = () => {
  const { products, loading, error, refetch } = useProducts();

  if (loading) {
    return (
      <MainLayout>
        <div className="product-list-container">
          <UserInfo />
          <h2>Our Products</h2>
          <ProductListSkeleton />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div>Error: {error}</div>
        <button onClick={refetch} className="retry-button">
          Retry
        </button>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="product-list-container">
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          <>
            <UserInfo />
            <h2>Our Products</h2>
            <div className="product-list">
              {products.map((product, index) => (
                <ProductCard key={product.id || index} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default ProductList;
