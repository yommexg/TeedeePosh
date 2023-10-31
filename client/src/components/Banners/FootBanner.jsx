import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useContent } from "../../hooks";
import arrayBufferToBase64 from "../../utils/arrayBuffertobase64";

const FootBanner = () => {
  const { banner, products } = useContent();
  const {
    discount,
    largeText1,
    largeText2,
    saleTime,
    midText,
    buttonText,
    desc,
  } = banner;

  const bannerProduct = products.find((prod) => prod._id === banner.productId);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % bannerProduct?.productImg.length
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [bannerProduct?.productImg.length]);

  return (
    <div className="footer-banner-container">
      <div className="descriptions">
        <h2>{saleTime}</h2>
        <h2>{discount}&#37; off</h2>
      </div>
      <div>
        <h3>{largeText1}</h3>
        <h2>{midText}</h2>
        <h3>{largeText2}</h3>
      </div>
      <div className="img-button-container">
        <img
          src={`data:${
            bannerProduct?.productImg[currentIndex]?.contentType
          };base64,${arrayBufferToBase64(
            bannerProduct?.productImg[currentIndex]?.data.data
          )}`}
          alt="banner"
          width={230}
          height={230}
        />
        <h5>{desc}</h5>
        <Link to={`/product-details/${banner?.productId}`}>
          <button>{buttonText}</button>
        </Link>
      </div>
    </div>
  );
};

export default FootBanner;
