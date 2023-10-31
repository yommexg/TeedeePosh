import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import "./AddBrand.css";

import {
  useAuth,
  useAxiosPrivate,
  useLoading,
  useProduct,
  useScroll,
} from "../../hooks";

import { handleEdit } from "../../utils/handleCat-brand";

import {
  handleEditDrop,
  handleEditFileChange,
  handleNullImage,
} from "../../utils/handleFiles";
import { handleNameChange } from "../../utils/handleNameChange";
import { handleExistImage } from "../../utils/handleImageExist";
import scrollToTop from "../../utils/scrollToTop";

const EDIT_BRAND_URL = "/brands/edit";
const BRAND_URL = "/getBrands";

const EditBrand = () => {
  const { brandEditName } = useParams();
  const { brands, setBrands } = useProduct();
  const { setLoading } = useLoading();

  const brand = brands.find((brand) => brand.brandName === brandEditName);

  const fileEdit = handleExistImage({ item: brand, brandImg: "brandImg" });

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [brandName, setBrandName] = useState(brand.brandName);
  const [brandNameChange, setBrandNameChange] = useState(false);
  const [brandImage, setBrandImage] = useState(fileEdit);
  const [contentType, setContentType] = useState(brand.brandImg.contentType);
  const [imageChange, setImageChange] = useState(false);

  const { userId } = useAuth();
  const { setVisible } = useScroll();

  const handleSubmit = (e) => {
    setVisible(true);
    scrollToTop();
    e.preventDefault();
    handleEdit({
      e,
      navigate,
      userId,
      ID: brand.brandName,
      brandName,
      setLoading,
      brandImage,
      axiosPrivate,
      EDIT_URL: EDIT_BRAND_URL,
      contentType,
      CONTENT_URL: BRAND_URL,
      brand,
      setContent: setBrands,
      brandNameChange,
      imageChange,
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
          onChange={(e) =>
            handleNameChange({
              e,
              setItemName: setBrandName,
              setItemNameChange: setBrandNameChange,
              brand,
            })
          }
          className="productName-input"
        />
      </label>
      <br />

      <div
        className="dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => {}}
        onDrop={(e) =>
          handleEditDrop({
            e,
            setItemImage: setBrandImage,
            setImageChange,
            setContentType,
            fileEdit,
          })
        }
      >
        {!brandImage && (
          <React.Fragment>
            <span className="dropImage">Drop the Brand's Logo here or</span>
            <label htmlFor="fileInput">
              select <strong>click to browse</strong>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) =>
                handleEditFileChange({
                  e,
                  setItemImage: setBrandImage,
                  setImageChange,
                  setContentType,
                  fileEdit,
                })
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
              onClick={() =>
                handleNullImage({
                  setContentType,
                  setImage: setBrandImage,
                })
              }
            >
              Change Image
            </button>
          </div>
        )}
      </div>

      <div className="addProductButtonContainer">
        <button onClick={handleSubmit}>Edit Brand</button>
      </div>
    </section>
  );
};

export default EditBrand;
