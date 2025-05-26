const ProductDetailsBody = ({ product, selectedSize, setSelectedSize }) => {
  const formatSize = (size) => {
    if (size.includes("Cans")) {
      return size.replace("Cans", "").trim();
    }
    if (size.includes("Bottles")) {
      return size.replace("Bottles,", " | ").trim();
    }
    return size;
  };
  return (
    <>
      <div className="product-detail__description">
        <h3>Description</h3>
        <p className="product-detail__description-text">
          {product.information}
          <span className="product-detail__read-more">Read more</span>
        </p>
      </div>

      <div className="product-detail__size-section">
        <h3>Size</h3>
        <div className="product-detail__size-options">
          {product.skus.map((size) => (
            <button
              key={size.code}
              className={`product-detail__size-option ${
                selectedSize === size.code
                  ? "product-detail__size-option--selected"
                  : ""
              }`}
              onClick={() => setSelectedSize(size.code)}
            >
              {formatSize(size.name)}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductDetailsBody;
