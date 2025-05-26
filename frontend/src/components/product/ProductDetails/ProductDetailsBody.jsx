import { useState } from "react";

const ProductDetailsBody = ({ product, selectedSize, setSelectedSize }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatSize = (size) => {
    if (size.includes("Cans")) {
      return size.replace("Cans", "").trim();
    }
    if (size.includes("Bottles")) {
      return size.replace("Bottles,", " | ").trim();
    }
    return size;
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  const truncateText = (text, maxLength = 200) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  return (
    <>
      <div className="product-detail__description">
        <h3>Description</h3>
        <div className="product-detail__description-container">
          <p className="product-detail__description-text">
            {isExpanded
              ? product.information
              : truncateText(product.information)}{" "}
            <span
              className="product-detail__read-more"
              onClick={toggleReadMore}
            >
              {isExpanded ? "Read less" : "Read more"}
            </span>
          </p>
        </div>
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
