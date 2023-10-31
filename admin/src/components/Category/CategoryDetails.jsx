import { useParams, Link, useNavigate } from "react-router-dom";

import {
  useAuth,
  useAxiosPrivate,
  useScroll,
  useLoading,
  useProduct,
} from "../../hooks";

import arrayBufferToBase64 from "../../utils/arrayBuffertobase64";
import { handleDelete } from "../../utils/handleDelete";
import scrollToTop from "../../utils/scrollToTop";

const CATEGORY_URL = "/getCategories";
const DELETE_CATEGORY_URL = "/categories/delete";

const CategoryDetails = () => {
  const { categoryName } = useParams();
  const { setVisible } = useScroll();

  const {
    categories,
    setCategories,
    setShowDeleteConfirmation,
    showDeleteConfirmation,
  } = useProduct();
  const { setLoading } = useLoading();

  const category = categories.find(
    (category) => category.categoryName === categoryName
  );

  const handleConfirm = (e) => {
    setVisible(true);
    scrollToTop();
    e.preventDefault();
    handleDelete({
      userId,
      navigate,
      setLoading,
      axiosPrivate,
      DELETE_URL: DELETE_CATEGORY_URL,
      CONTENT_URL: CATEGORY_URL,
      ID: categoryName,
      setContent: setCategories,
      category,
    });
    setShowDeleteConfirmation(false);
  };

  const { userId } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  return (
    <div className="brand-detail-container">
      <p className="brandName">
        Category: <span>{category?.categoryName}</span>
      </p>
      <div className="brand-detail-img-container">
        <img
          src={`data:${
            category?.categoryImg.contentType
          };base64,${arrayBufferToBase64(category.categoryImg.data.data)}`}
          alt={category?.categoryName}
        />
      </div>
      <div className="edit-delete-container">
        <Link to={`/edit-category/${category.categoryName}`}>
          <button className="edit">EDIT CATEGORY</button>
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
              Delete {category.categoryName} Category?
            </div>
            <button className="confirm-button" onClick={handleConfirm}>
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

export default CategoryDetails;
