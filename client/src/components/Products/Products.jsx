import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useProduct } from "../../hooks";
import { arrayBufferToBase64, FormatPrice } from "../../utils";

import "./Products.css";
const Products = ({ product: { name, price, discount, productImg, _id } }) => {
  const {
    setSizeIndex,
    setShowAddtoCart,
    setShowRemovefromCart,
    cartItems,
    handleProductReset,
    DiscountedPrice,
  } = useProduct();

  const discountedPrice = DiscountedPrice(price, discount);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % productImg.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [productImg.length]);

  return (
    <div className="product-card" onClick={handleProductReset}>
      <Link to={`/product-details/${_id}`}>
        <img
          src={`data:${
            productImg[currentIndex]?.contentType
          };base64,${arrayBufferToBase64(productImg[currentIndex]?.data.data)}`}
          alt="banner"
          width={80}
          height={80}
          className="product-image"
        />
      </Link>
      <p className="product-name">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </p>
      <p className="product-price">{FormatPrice(discountedPrice)}</p>
      {discount > 0 && (
        <p className="product-original-price">
          <span>{FormatPrice(price)}</span>
          <strong>-{discount}&#37;</strong>
        </p>
      )}
    </div>
  );
};

export default Products;
