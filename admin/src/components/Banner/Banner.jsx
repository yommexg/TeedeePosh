import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import {
  useProduct,
  useAxiosPrivate,
  useAuth,
  useScroll,
  useLoading,
} from "../../hooks";

import "./Banner.css";
import { handleUpdateBanner } from "./handleUpdateBanner";

import { convertImagesToBase64 } from "../../utils/imageConverter";
import { handleSelectProductImage } from "../../utils/handleImageExist";
import scrollToTop from "../../utils/scrollToTop";

const Banner = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { products, banner, setBanner } = useProduct();
  const { setLoading } = useLoading();
  const { setVisible } = useScroll();

  const [discount, setDiscount] = useState(banner?.discount);
  const [productId, setProductId] = useState(
    banner?.productId ? banner?.productId : ""
  );
  const [productDetails, setProductDetails] = useState(banner?.desc);
  const [time, setTime] = useState(banner?.saleTime);
  const [smallText, setSmallText] = useState(banner?.smallText);
  const [middleText, setMiddleText] = useState(banner?.midText);
  const [buttonText, setButtonText] = useState(banner?.buttonText);
  const [largeText1, setLargeText1] = useState(banner?.largeText1);
  const [largeText2, setLargeText2] = useState(banner?.largeText2);

  const convertedImageDataArray = convertImagesToBase64(products);

  const selectedProduct = convertedImageDataArray.find(
    (prod) => prod.ID === productId
  );

  const fileEdit = handleSelectProductImage({ selectedProduct });

  const handleSubmit = (e) => {
    e.preventDefault();
    scrollToTop();
    if (
      productId === banner?.productId &&
      discount === banner?.discount &&
      productDetails === banner?.desc &&
      smallText === banner?.smallText &&
      time === banner?.saleTime &&
      buttonText === banner?.buttonText &&
      middleText === banner?.midText &&
      largeText1 === banner?.largeText1 &&
      largeText2 === banner?.largeText2
    ) {
      toast.error(<div className="toast">NO CHANGES DETECTED</div>, {
        duration: 5000,
      });
    } else {
      setVisible(true);
      handleUpdateBanner({
        e,
        setLoading,
        userId,
        productId,
        productDetails,
        discount,
        largeText1,
        largeText2,
        time,
        smallText,
        middleText,
        buttonText,
        fileEdit,
        selectedProduct,
        navigate,
        axiosPrivate,
        setBanner,
      });
    }
  };

  return (
    <section className="banner-container">
      <label htmlFor="products" className="banner-product">
        <p className="head">Product:</p>
        <select onChange={(e) => setProductId(e.target.value)}>
          <option
            style={{
              color: "red",
              fontSize: "12px",
              backgroundColor: "greenyellow",
            }}
            value={productId ? productId : ""}
          >
            {selectedProduct ? selectedProduct.name : "Select Product"}
          </option>
          {products.map((product) => (
            <option value={product._id} key={product._id}>
              {product.name}
            </option>
          ))}
        </select>
        {productId && (
          <div className="banner-image">
            <img
              src={
                selectedProduct
                  ? `data:${
                      convertedImageDataArray.find(
                        (prod) => prod.ID === productId
                      ).type
                    };base64,${
                      convertedImageDataArray.find(
                        (prod) => prod.ID === productId
                      ).base64Image
                    }`
                  : null
              }
              width={120}
              height={120}
              alt="product"
            />
          </div>
        )}
      </label>

      <label htmlFor="productDiscount">
        <p className="head">Discount: </p>
        <input
          type="number"
          min="0"
          step="1"
          max="100"
          placeholder="Disc &#37;"
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
          className="discount-input"
        />
      </label>

      <label htmlFor="productdetails" className="banner-details">
        <p className="head">Details:</p>
        <textarea
          id="productdetails"
          type="text"
          value={productDetails}
          placeholder="Details"
          onChange={(e) => setProductDetails(e.target.value)}
        />
      </label>

      <label htmlFor="time" className="banner-time">
        <p className="head">Time:</p>
        <input
          id="time"
          value={time}
          type="text"
          placeholder="Time"
          onChange={(e) => setTime(e.target.value)}
        />
      </label>

      <label htmlFor="smallText" className="banner-time">
        <p className="head">Small Text:</p>
        <input
          id="smallText"
          value={smallText}
          type="text"
          placeholder="Small Text"
          onChange={(e) => setSmallText(e.target.value)}
        />
      </label>

      <label htmlFor="productname" className="banner-time">
        <p className="head">Button Text:</p>
        <input
          id="buttonText"
          value={buttonText}
          type="text"
          placeholder="Button Text"
          onChange={(e) => setButtonText(e.target.value)}
        />
      </label>

      <label htmlFor="midText" className="banner-middle-text">
        <p className="head">Middle Text:</p>
        <input
          id="midText"
          type="text"
          value={middleText}
          placeholder="Middle Text"
          onChange={(e) => setMiddleText(e.target.value)}
        />
      </label>
      <label htmlFor="largeText1" className="largetext">
        <p className="head">Large Text 1:</p>
        <textarea
          id="largeText1"
          value={largeText1}
          type="text"
          placeholder="Large Text 1"
          onChange={(e) => setLargeText1(e.target.value)}
        />
      </label>
      <label htmlFor="largeText2" className="largetext">
        <p className="head">Large Text 2:</p>
        <textarea
          id="largeText2"
          type="text"
          placeholder="Large Text 2"
          value={largeText2}
          onChange={(e) => setLargeText2(e.target.value)}
        />
      </label>
      <div className="addProductButtonContainer">
        <button onClick={handleSubmit}>Change Banner</button>
      </div>
    </section>
  );
};

export default Banner;
