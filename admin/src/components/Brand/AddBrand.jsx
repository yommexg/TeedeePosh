import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./AddBrand.css";

import {
  useAuth,
  useAxiosPrivate,
  useLoading,
  useProduct,
  useScroll,
} from "../../hooks";

import { handleAdd } from "../../utils/handleCat-brand";
import scrollToTop from "../../utils/scrollToTop";

import {
  handleDrop,
  handleFileChange,
  handleNullImage,
} from "../../utils/handleFiles";

const ADD_BRAND_URL = "/brands/new";
const BRAND_URL = "/getBrands";

const AddBrand = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { setLoading } = useLoading();
  const { setBrands } = useProduct();

  const [brandName, setBrandName] = useState("");
  const [brandImage, setBrandImage] = useState(null);
  const [contentType, setContentType] = useState("");

  const { userId } = useAuth();
  const { setVisible } = useScroll();

  const handleSubmit = (e) => {
    e.preventDefault();
    setVisible(true);
    scrollToTop();
    handleAdd({
      e,
      navigate,
      userId,
      brandName: brandName.trim(),
      setLoading,
      brandImage,
      axiosPrivate,
      ADD_URL: ADD_BRAND_URL,
      contentType,
      CONTENT_URL: BRAND_URL,
      setContent: setBrands,
      brand: "brand",
    });
  };

  return (
    <section className="brandname-category-container">
      <label htmlFor="brandName" className="brandName">
        <p className="head">Brand Name</p>
        <input
          type="text"
          placeholder="Name of Brand"
          value={brandName}
          onChange={(e) => setBrandName(e.target.value.trimStart())}
          className="productName-input"
        />
      </label>
      <br />

      <div
        className="dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => {}}
        onDrop={(e) =>
          handleDrop({ e, setContentType, setImage: setBrandImage })
        }
      >
        {!brandImage && (
          <React.Fragment>
            <span className="dropImage">Drop the Brand's Logo here or </span>
            <label htmlFor="fileInput">
              select <strong>click to browse</strong>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) =>
                handleFileChange({ e, setContentType, setImage: setBrandImage })
              }
            />
          </React.Fragment>
        )}
        {brandImage && (
          <div className="upload-product-image-container">
            <img
              className="upload-product-image"
              src={URL.createObjectURL(brandImage)}
              alt="Uploaded"
              accept="image/*"
              name="productImg"
            />
            <button
              onClick={(e) =>
                handleNullImage({ setContentType, setImage: setBrandImage })
              }
            >
              Change Image
            </button>
          </div>
        )}
      </div>

      <div className="addProductButtonContainer">
        <button onClick={handleSubmit}>Add Brand</button>
      </div>
    </section>
  );
};

export default AddBrand;
