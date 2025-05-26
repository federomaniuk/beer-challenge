import "./ProductCard.scss";
import { useFormat } from "../../../hooks/useFormat";

const ProductCard = ({ product }) => {
  const { formatPrice } = useFormat();

  return (
    <article className="product-card">
      {product.brand}
      <div className="product-card__image">
        <img src={product.image} alt={product.brand} />
      </div>
      {formatPrice(product.prices[0].price, "cents")}
    </article>
  );
};

export default ProductCard;
