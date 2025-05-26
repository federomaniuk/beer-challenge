import BagIcon from "../../icons/BagIcon";

const ProductDetailsFooter = () => {
  return (
    <div className="product-detail__actions">
      <button className="product-detail__favorite-btn">
        <BagIcon />
      </button>
      <button className="product-detail__add-to-cart-btn">Add to cart</button>
    </div>
  );
};

export default ProductDetailsFooter;
