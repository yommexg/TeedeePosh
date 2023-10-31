import "./SizeSelector.css";

const SizeSelector = ({
  sizesArray,
  productSizeIndex,
  handleProductSizeSelect,
}) => {
  return (
    <div className="sizes-container">
      {sizesArray.map((size, i) => (
        <button
          key={size}
          className={productSizeIndex === i ? "selected-size" : ""}
          onClick={() => handleProductSizeSelect(i, size)}
        >
          {size}
        </button>
      ))}
    </div>
  );
};

export default SizeSelector;
