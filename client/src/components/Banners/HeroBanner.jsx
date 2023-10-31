import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { useContent } from "../../hooks";
import arrayBufferToBase64 from "../../utils/arrayBuffertobase64";

import "./Banner.css";

const HeroBanner = () => {
  const { banner, products } = useContent();

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
    <div className="hero-banner-container">
      <div className="banner-image-container">
        <img
          src={`data:${
            bannerProduct?.productImg[currentIndex]?.contentType
          };base64,${arrayBufferToBase64(
            bannerProduct?.productImg[currentIndex]?.data.data
          )}`}
          alt="banner"
          width={200}
          height={200}
        />
      </div>
      <div className="banner-details-container">
        <h2>{banner.smallText} </h2>
        <p>
          <strong>{banner.discount}&#37;</strong> off
        </p>
        <h5>{banner.desc}</h5>
        <Link to={`/product-details/${banner?.productId}`}>
          <button>{banner.buttonText}</button>
        </Link>
      </div>
    </div>
  );
};

export default HeroBanner;
