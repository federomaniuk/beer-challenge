import "./ProductCard.scss";
import { useFormat } from "../../../hooks/useFormat";
import AddIcon from "../../icons/AddIcon";

const ProductCard = ({ product }) => {
  const { formatPrice } = useFormat();

  return (
    <article className="product-card">
      <h5>{product.brand}</h5>
      <div className="product-card__image">
        <img src={product.image} alt={product.brand} />
      </div>
      <footer className="product-card__footer">
        <span>{formatPrice(product.prices[0].price, "cents")}</span>
        <button className="product-card__add-button">
          <AddIcon />
        </button>
      </footer>
    </article>
  );
};

export default ProductCard;
