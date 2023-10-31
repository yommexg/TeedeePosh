import { useParams, Link, useNavigate } from "react-router-dom";

import {
  useAuth,
  useAxiosPrivate,
  useLoading,
  useProduct,
  useScroll,
} from "../../hooks";

import arrayBufferToBase64 from "../../utils/arrayBuffertobase64";
import { handleDelete } from "../../utils/handleDelete";
import scrollToTop from "../../utils/scrollToTop";

const DELETE_PRODUCT_URL = "/products/delete";
const PRODUCTS_URL = "/getProducts";

const ProductDetails = () => {
  const { productId } = useParams();
  const {
    products,
    setProducts,
    showDeleteConfirmation,
    setShowDeleteConfirmation,
  } = useProduct();
  const { setLoading } = useLoading();
  const { userId } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const { setVisible } = useScroll();

  const product = products.find((product) => product._id === productId);

  const { brand, category, discount, details, price, size, productImg, stock } =
    product;

  const handleConfirm = (e) => {
    setVisible(true);
    scrollToTop();
    e.preventDefault();
    handleDelete({
      userId,
      navigate,
      setLoading,
      axiosPrivate,
      DELETE_URL: DELETE_PRODUCT_URL,
      CONTENT_URL: PRODUCTS_URL,
      ID: productId,
      setContent: setProducts,
      product,
    });
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="brand-detail-container">
      <p className="brandName">
        <span>
          {product.name.charAt(0).toUpperCase() + product.name.slice(1)}
        </span>
      </p>
      <div className="brand-detail-img-container">
        <img
          src={`data:${
            product?.productImg[0].contentType
          };base64,${arrayBufferToBase64(product?.productImg[0].data.data)}`}
          alt={product?.name}
          width={200}
        />
      </div>

      <div className="product-detail-container">
        <p>
          Price: <span>&#x20A6;{price}</span>
        </p>
        <p>
          Amount(stock): <span>{stock}</span>
        </p>
        <p>
          Discount: <span>{discount}%</span>
        </p>
        <p>
          Images Availiable: <span>({productImg.length})</span>
        </p>
        <p>
          Sizes Availiable: <span>{size}</span>
        </p>
        <p>
          Brand: <span>{brand}</span>
        </p>
        <p>
          Category: <span>{category}</span>
        </p>
        <p>
          Description: <span>{details}</span>
        </p>
      </div>
      <div className="edit-delete-container">
        <Link to={`/edit-product/${productId}`}>
          <button className="edit">EDIT PRODUCT</button>
        </Link>

        <button
          onClick={() => setShowDeleteConfirmation(true)}
          className="delete"
        >
          DELETE
        </button>

        {showDeleteConfirmation && (
          <div className="confirmation-modal">
            <div className="confirmation-message">
              Delete Product {product.name} ?
            </div>
            <button onClick={handleConfirm} className="confirm-button">
              Yes
            </button>
            <button
              className="cancel-button"
              onClick={() => setShowDeleteConfirmation(false)}
            >
              No
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
