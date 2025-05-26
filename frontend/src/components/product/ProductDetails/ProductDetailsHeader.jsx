import { useFormat } from "../../../hooks/useFormat";

const ProductDetailsHeader = ({ product, currentSku }) => {
  const { formatPrice } = useFormat();
  return (
    <header className="product-detail__header">
      <div className="product-detail__title-container">
        <h1 className="product-detail__title">{product.brand}</h1>

        <p className="product-detail__meta">
          <span className="product-detail__origin">
            Origin: {product.origin}
          </span>
          <span className="product-detail__divider"> | </span>
          <span className="product-detail__stock">
            Stock: {currentSku?.stock || 0}
          </span>
        </p>
      </div>

      <p className="product-detail__price">{formatPrice(currentSku?.price)}</p>
    </header>
  );
};

export default ProductDetailsHeader;
