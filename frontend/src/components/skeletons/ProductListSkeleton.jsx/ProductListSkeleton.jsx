import "./ProductListSkeleton.scss";

const ProductListSkeleton = () => {
  return (
    <div className="product-list-skeleton">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="product-list-skeleton__item" />
      ))}
    </div>
  );
};

export default ProductListSkeleton;
