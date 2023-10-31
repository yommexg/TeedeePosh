import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { convertImagesToBase64 } from "../../utils/imageConverter";

import { sizes } from "../../data/sizes";

import {
  useAuth,
  useAxiosPrivate,
  useLoading,
  useProduct,
  useScroll,
} from "../../hooks";

import "./AddProduct.css";
import AddImageUploader from "./AddImageUploader";
import { handleAddProduct } from "../../utils/handleProduct";
import scrollToTop from "../../utils/scrollToTop";

const AddProduct = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { userId } = useAuth();
  const { categories, brands, setProducts } = useProduct();
  const { setLoading } = useLoading();
  const { setVisible } = useScroll();

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productBrand, setProductBrand] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDiscount, setProductDiscount] = useState("");
  const [productImage1, setProductImage1] = useState(null);
  const [productImage2, setProductImage2] = useState(null);
  const [productImage3, setProductImage3] = useState(null);
  const [productSize, setProductSize] = useState("");
  const [productStock, setProductStock] = useState("");

  const files = [productImage1, productImage2, productImage3];
  const productImages = files.filter((img) => img !== null);

  const contentTypes = productImages.map((img) => {
    return img.type;
  });

  const categoryImages = convertImagesToBase64(categories, "categoryImg");
  const brandImages = convertImagesToBase64(brands, "brandImg");

  const handleSubmit = (e) => {
    e.preventDefault();
    setVisible(true);
    scrollToTop();
    handleAddProduct({
      userId,
      productName,
      productPrice,
      productDetails,
      productDiscount,
      productSize,
      productBrand,
      productCategory,
      productImages,
      productStock,
      contentTypes,
      setLoading,
      setProducts,
      navigate,
      axiosPrivate,
    });
  };

  return (
    <section className="addProduct-container">
      <label htmlFor="productName">
        <p className="head">Product Name</p>
        <input
          type="text"
          placeholder="Name of Product"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="productName-input"
        />
        <p className="instructions">
          Do not exceed 20 characters when entering the product name.
        </p>
      </label>
      <br />
      <div className="price-discount">
        <label htmlFor="productPrice">
          <p className="head">Price</p>
          <input
            type="number"
            min="0"
            placeholder="Enter Price"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            className="price-input"
          />
        </label>
        <label htmlFor="productStock">
          <p className="head">Stock</p>
          <input
            type="number"
            min="0"
            placeholder="Stk Val"
            value={productStock}
            onChange={(e) => setProductStock(e.target.value)}
            className="discount-input"
          />
        </label>
        <label htmlFor="productDiscount">
          <p className="head">Discount</p>
          <input
            type="number"
            min="0"
            step="1"
            max="100"
            placeholder="Disc &#37;"
            value={productDiscount}
            onChange={(e) => setProductDiscount(e.target.value)}
            className="discount-input"
          />
        </label>
      </div>

      <br />
      <div className="cat-brand">
        <label htmlFor="productCategory">
          <p className="head">Category</p>
          <select
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories
              .sort((a, b) => a.categoryName.localeCompare(b.categoryName))
              .map((category) => (
                <option
                  value={category.categoryName}
                  key={category.categoryName}
                >
                  {category.categoryName}
                </option>
              ))}
          </select>
          {productCategory && (
            <img
              src={`data:${
                categoryImages.find(
                  (category) => category.name === productCategory
                ).type
              };base64,${
                categoryImages.find(
                  (category) => category.name === productCategory
                ).base64Image
              }`}
              width={45}
              height={45}
              className="cat-brand-img"
              alt={productCategory}
            />
          )}
        </label>
        <label htmlFor="productBrand">
          <p className="head">Brand</p>
          <select
            value={productBrand}
            onChange={(e) => setProductBrand(e.target.value)}
          >
            <option value="">Select Brand</option>
            {brands
              .sort((a, b) => a.brandName.localeCompare(b.brandName))
              .map((brand) => (
                <option value={brand.brandName} key={brand.brandName}>
                  {brand.brandName}
                </option>
              ))}
          </select>
          {productBrand && (
            <img
              src={`data:${
                brandImages.find((brand) => brand.name === productBrand).type
              };base64,${
                brandImages.find((brand) => brand.name === productBrand)
                  .base64Image
              }`}
              width={45}
              height={45}
              className="cat-brand-img"
              alt={productBrand}
            />
          )}
        </label>
      </div>
      <br />
      <label htmlFor="productDetails">
        <p className="head">Description</p>
        <textarea
          type="text"
          value={productDetails}
          onChange={(e) => setProductDetails(e.target.value)}
          className="product-desc"
        />
        <p className="instructions">
          Do not exceed 200 characters when entering the product description.
        </p>
      </label>
      <label htmlFor="productImages">
        <p className="head">Product Images</p>
        <AddImageUploader
          file1={productImage1}
          file2={productImage2}
          file3={productImage3}
          setFile1={setProductImage1}
          setFile2={setProductImage2}
          setFile3={setProductImage3}
        />
      </label>
      <label htmlFor="productSize" className="product-size">
        <p className="head">Add Size</p>
        <select
          value={productSize}
          onChange={(e) => setProductSize(e.target.value)}
        >
          <option value="">Select Product Sizes Available</option>
          {sizes.map((size) => (
            <option value={size} key={size}>
              {size}
            </option>
          ))}
        </select>
      </label>

      <div className="addProductButtonContainer">
        <button onClick={handleSubmit}>Add Product</button>
      </div>
    </section>
  );
};

export default AddProduct;
