import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.brand} />
      {product.brand}
    </article>
  );
};

export default ProductCard;
