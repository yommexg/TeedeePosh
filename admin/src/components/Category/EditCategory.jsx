import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  useAuth,
  useAxiosPrivate,
  useScroll,
  useLoading,
  useProduct,
} from "../../hooks";

import { handleEdit } from "../../utils/handleCat-brand";
import {
  handleEditDrop,
  handleEditFileChange,
  handleNullImage,
} from "../../utils/handleFiles";
import { handleNameChange } from "../../utils/handleNameChange";
import scrollToTop from "../../utils/scrollToTop";
import { handleExistImage } from "../../utils/handleImageExist";

const CATEGORY_URL = "/getCategories";
const EDIT_CATEGORY_URL = "/categories/edit";

const EditCategory = () => {
  const { categoryEditName } = useParams();
  const { categories, setCategories } = useProduct();
  const { setLoading } = useLoading();
  const { setVisible } = useScroll();
  const { userId } = useAuth();

  const category = categories.find(
    (category) => category.categoryName === categoryEditName
  );

  const fileEdit = handleExistImage({
    item: category,
    categoryImg: "categoryImg",
  });

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const [categoryName, setCategoryName] = useState(category.categoryName);
  const [categoryNameChange, setCategoryNameChange] = useState(false);
  const [categoryImage, setCategoryImage] = useState(fileEdit);
  const [contentType, setContentType] = useState(
    category.categoryImg.contentType
  );
  const [imageChange, setImageChange] = useState(false);

  const handleSubmit = (e) => {
    setVisible(true);
    scrollToTop();
    e.preventDefault();
    handleEdit({
      e,
      navigate,
      userId,
      ID: category.categoryName,
      categoryName,
      setLoading,
      categoryImage,
      axiosPrivate,
      EDIT_URL: EDIT_CATEGORY_URL,
      contentType,
      CONTENT_URL: CATEGORY_URL,
      category,
      setContent: setCategories,
      categoryNameChange,
      imageChange,
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
          onChange={(e) =>
            handleNameChange({
              e,
              category,
              setItemName: setCategoryName,
              setItemNameChange: setCategoryNameChange,
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
            setItemImage: setCategoryImage,
            setImageChange,
            setContentType,
            fileEdit,
          })
        }
      >
        {!categoryImage && (
          <React.Fragment>
            <span className="dropImage">Drop the Category's Logo here or</span>
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
                  setItemImage: setCategoryImage,
                  setImageChange,
                  setContentType,
                  fileEdit,
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
              onClick={() =>
                handleNullImage({
                  setContentType,
                  setImage: setCategoryImage,
                })
              }
            >
              Change Image
            </button>
          </div>
        )}
      </div>

      <div className="addProductButtonContainer">
        <button onClick={handleSubmit}>Edit Category</button>
      </div>
    </section>
  );
};

export default EditCategory;
