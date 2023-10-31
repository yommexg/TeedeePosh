import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useAuth,
  useAxiosPrivate,
  useLoading,
  useScroll,
  useProduct,
} from "../../hooks";
import { handleAdd } from "../../utils/handleCat-brand";
import {
  handleDrop,
  handleFileChange,
  handleNullImage,
} from "../../utils/handleFiles";
import scrollToTop from "../../utils/scrollToTop";

const ADD_CATEGORY_URL = "/categories/new";
const CATEGORY_URL = "/getCategories";

const AddCategory = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const { setVisible } = useScroll();
  const { userId } = useAuth();
  const { setCategories } = useProduct();
  const { setLoading } = useLoading();

  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [contentType, setContentType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setVisible(true);
    scrollToTop();
    handleAdd({
      e,
      navigate,
      userId,
      categoryName: categoryName.trim(),
      setLoading,
      categoryImage,
      axiosPrivate,
      ADD_URL: ADD_CATEGORY_URL,
      contentType,
      CONTENT_URL: CATEGORY_URL,
      setContent: setCategories,
      category: "category",
    });
  };

  return (
    <section className="brandname-category-container">
      <label htmlFor="categoryName" className="brandName">
        <p className="head">Category Name</p>
        <input
          type="text"
          placeholder="Name of Category"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value.trimStart())}
          className="productName-input"
        />
      </label>
      <br />

      <div
        className="dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={() => {}}
        onDrop={(e) =>
          handleDrop({ e, setContentType, setImage: setCategoryImage })
        }
      >
        {!categoryImage && (
          <React.Fragment>
            <span className="dropImage">Drop the Category's Image here or</span>
            <label htmlFor="fileInput">
              select <strong>click to browse</strong>
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) =>
                handleFileChange({
                  e,
                  setContentType,
                  setImage: setCategoryImage,
                })
              }
            />
          </React.Fragment>
        )}
        {categoryImage && (
          <div className="upload-product-image-container">
            <img
              className="upload-product-image"
              src={URL.createObjectURL(categoryImage)}
              alt="Uploaded"
              accept="image/*"
              name="productImg"
            />
            <button
              onClick={(e) =>
                handleNullImage({ setContentType, setImage: setCategoryImage })
              }
            >
              Change Image
            </button>
          </div>
        )}
      </div>

      <div className="addProductButtonContainer">
        <button onClick={handleSubmit}>Add Category</button>
      </div>
    </section>
  );
};

export default AddCategory;
