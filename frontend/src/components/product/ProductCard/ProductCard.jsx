import "./ProductCard.scss";
import { useFormat } from "../../../hooks/useFormat";
import { Link } from "react-router-dom";
import AddIcon from "../../icons/AddIcon";
import Star from "../../icons/Star";

const ProductCard = ({ product }) => {
  const { formatPrice } = useFormat();

  const createProductSlug = (id, brand) => {
    const slug = brand.toLowerCase().replace(/\s+/g, "-");
    return `${id}-${slug}`;
  };

  const productSlug = createProductSlug(product.id, product.brand);

  return (
    <article className="product-card">
      <Link to={`/product/${productSlug}`} className="product-card__link">
        <h5>{product.brand}</h5>
        <div className="product-card__image">
          <img src={product.image} alt={product.brand} />
        </div>
      </Link>
      <footer className="product-card__footer">
        <div className="product-card__rating">
          <Star /> 4.9
        </div>
        <span>{formatPrice(product.prices[0].price, "cents")}</span>
        <Link
          to={`/product/${productSlug}`}
          className="product-card__add-button"
        >
          <AddIcon />
        </Link>
      </footer>
    </article>
  );
};

export default ProductCard;
