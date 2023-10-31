import { useParams } from "react-router-dom";

import "./ProductDetails.css";
import SizeSelector from "./SizeSelector";
import OtherProduct from "./OtherProduct";

import { arrayBufferToBase64, FormatPrice } from "../../utils";
import { useContent, useProduct } from "../../hooks";

const ProductDetails = () => {
  const { productId } = useParams();

  const { products, banner } = useContent();
  const {
    productImageIndex,
    productSizeIndex,
    handleProductSizeSelect,
    handleProductImageSelect,
    DiscountedPrice,
    sizesArray,
    handleSelectedProductQuantity,
    selectedProductQuantity,
    handleAddtoCart,
  } = useProduct();

  const product = products.find((product) => product._id === productId);
  const bannerProduct = banner.productId === productId;

  const {
    name,
    productImg,
    details,
    price,
    brand,
    category,
    stock,
    size,
    discount,
  } = product;

  let discountedPrice;

  if (bannerProduct) {
    discountedPrice = DiscountedPrice(price, banner?.discount);
  } else {
    discountedPrice = DiscountedPrice(price, discount);
  }

  const sizeArray = sizesArray(size);

  return (
    <div className="product-detail-wrapper">
      {bannerProduct && (
        <h1 className="banner-product-title">
          Offer availiable for <span>{name}</span> at{" "}
          <span>{banner.saleTime}</span> with a massive discount of{" "}
          <span>{banner?.discount}&#37;</span>
        </h1>
      )}
      <div className="product-detail-container">
        <div className="product-images-container">
          <div className="small-images-container">
            {productImg?.map((item, i) => (
              <img
                key={i}
                src={`data:${item.contentType};base64,${arrayBufferToBase64(
                  item.data.data
                )}`}
                alt={name}
                className={i === productImageIndex ? "selected-image" : ""}
                onMouseEnter={() => handleProductImageSelect(i)}
                height={80}
                width={80}
              />
            ))}
          </div>
          <div className="big-image-container">
            <img
              src={`data:${
                productImg[productImageIndex]?.contentType
              };base64,${arrayBufferToBase64(
                productImg[productImageIndex]?.data.data
              )}`}
              alt={name}
              width={270}
              height={270}
            />
          </div>
        </div>
        <div className="product-details">
          <h1>{name}</h1>
          <h5>{details}</h5>
          <div className="product-brand-cat">
            <h4>
              Brand: <strong>{brand}</strong>
            </h4>
            <h4>
              Category: <strong>{category}</strong>
            </h4>
          </div>
          <div className="price-stock-container">
            {bannerProduct ? (
              <div className="price-container">
                <p className="price">{FormatPrice(discountedPrice)}</p>
                <p>
                  <span>{FormatPrice(price)}</span>{" "}
                  <strong>({banner.discount}&#37; off)</strong>
                </p>
              </div>
            ) : discount > 0 ? (
              <div className="price-container">
                <p className="price">{FormatPrice(discountedPrice)}</p>
                <p>
                  <span>{FormatPrice(price)}</span>
                  <strong>({discount}&#37; off)</strong>
                </p>
              </div>
            ) : (
              <div className="price-container">
                <p className="price">{FormatPrice(discountedPrice)}</p>
              </div>
            )}

            <h4>
              Stock: <strong>{stock}</strong>
            </h4>
          </div>

          <div className="line"></div>
          <div className="choose-size-container">
            <p>Choose Size</p>
            <SizeSelector
              size={size}
              sizesArray={sizeArray}
              productSizeIndex={productSizeIndex}
              handleProductSizeSelect={handleProductSizeSelect}
            />
          </div>
          <div className="line"></div>
          <div className="add-to-cart-container">
            <select
              value={selectedProductQuantity}
              onChange={handleSelectedProductQuantity}
            >
              {Array.from({ length: stock }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  {index + 1}
                </option>
              ))}
            </select>
            <button onClick={() => handleAddtoCart(product)}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <OtherProduct products={products} selectedProduct={product} />
    </div>
  );
};

export default ProductDetails;
