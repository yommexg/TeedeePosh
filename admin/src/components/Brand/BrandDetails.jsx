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

const DELETE_BRAND_URL = "/brands/delete";
const BRAND_URL = "/getBrands";

const BrandDetails = () => {
  const {
    brands,
    setBrands,
    setShowDeleteConfirmation,
    showDeleteConfirmation,
  } = useProduct();
  const { setLoading } = useLoading();

  const { brandName } = useParams();
  const brand = brands.find((brand) => brand.brandName === brandName);

  const { userId } = useAuth();
  const { setVisible } = useScroll();

  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();

  const handleConfirm = (e) => {
    setVisible(true);
    scrollToTop();
    e.preventDefault();
    handleDelete({
      userId,
      navigate,
      setLoading,
      axiosPrivate,
      DELETE_URL: DELETE_BRAND_URL,
      CONTENT_URL: BRAND_URL,
      ID: brandName,
      setContent: setBrands,
      brand,
    });
    setShowDeleteConfirmation(false);
  };

  return (
    <div className="brand-detail-container">
      <p className="brandName">
        Brand: <span>{brand?.brandName}</span>
      </p>
      <div className="brand-detail-img-container">
        <img
          src={`data:${brand.brandImg.contentType};base64,${arrayBufferToBase64(
            brand.brandImg.data.data
          )}`}
          alt={brand?.brandName}
        />
      </div>
      <div className="edit-delete-container">
        <Link to={`/edit-brand/${brand.brandName}`}>
          <button className="edit">EDIT BRAND</button>
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
              Delete {brand.brandName} Brand?
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

export default BrandDetails;
