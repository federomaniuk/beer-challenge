import MainLayout from "../../layouts/MainLayout";
import { useProducts } from "../../../hooks/useApi";
import ProductCard from "../../product/ProductCard/ProductCard";

const ProductList = () => {
  const { products, loading, error, refetch } = useProducts();

  if (loading) {
    return (
      <MainLayout>
        <div>Loading products...</div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div>Error: {error}</div>
        <button onClick={refetch}>Retry</button>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div>
        {products.length === 0 ? (
          <p>No products available</p>
        ) : (
          products.map((product, index) => (
            <ProductCard key={product.id || index} product={product} />
          ))
        )}
      </div>
    </MainLayout>
  );
};

export default ProductList;
