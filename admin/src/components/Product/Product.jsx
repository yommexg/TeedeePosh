import { Link } from "react-router-dom";

import { useProduct, useScroll } from "../../hooks";

import arrayBufferToBase64 from "../../utils/arrayBuffertobase64";
import scrollToTop from "../../utils/scrollToTop";

import "./Products.css";
const Product = ({ product: { name, price, productImg, _id } }) => {
  const { setVisible } = useScroll();
  const { setShowDeleteConfirmation } = useProduct();

  const firstImg = productImg[0];
  const data = firstImg.data.data;
  const type = firstImg.contentType;

  const base64String = arrayBufferToBase64(data);
  const handleLink = () => {
    setVisible(true);
    scrollToTop();
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="product-card">
      <Link to={`/product-details/${_id}`}>
        <img
          src={`data:${type};base64,${base64String}`}
          width={100}
          height={100}
          className="product-image"
          alt={name}
          onClick={handleLink}
        />
      </Link>
      <p className="product-name">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </p>
      <p className="product-price">&#8358;{price}</p>
    </div>
  );
};

export default Product;
