import { toast } from "react-hot-toast";
import axios from "../api/axios";

export const handleDelete = async ({
  userId,
  navigate,
  setLoading,
  axiosPrivate,
  DELETE_URL,
  CONTENT_URL,
  ID,
  setContent,
  product,
  brand,
  category,
}) => {
  if (!userId) {
    navigate("/login");
    return;
  }

  setLoading(true);
  try {
    await axiosPrivate.delete(`${DELETE_URL}/${ID}`);
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    const fetchContent = async () => {
      setLoading(true);
      try {
        const response = await axios.get(CONTENT_URL);
        setContent(response.data);
      } catch (error) {
        console.error(error);
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    };

    fetchContent();
    if (product) {
      navigate("/");
    } else if (brand) {
      navigate("/brands");
    } else {
      navigate("/categories");
    }

    toast.success(
      <div className="toast">
        {product && (
          <>
            Item <strong>{product.name}</strong>
          </>
        )}
        {brand && (
          <>
            <strong>{brand.brandName}</strong> Brand
          </>
        )}
        {category && (
          <>
            <strong>{category.categoryName}</strong> Category
          </>
        )}{" "}
        has been deleted
      </div>,
      {
        duration: 5000,
      }
    );
  } catch (err) {
    if (!err?.response) {
      toast.error(<div className="toast">No Server Response</div>, {
        duration: 5000,
      });
    } else if (err.response?.status === 401) {
      toast.error(<div className="toast">Unauthorized</div>, {
        duration: 5000,
      });
    } else {
      toast.error(
        <div className="toast">
          <strong>
            {product.name || brand.brandName || category.categoryName}
          </strong>
          could not be deleted
        </div>,
        {
          duration: 5000,
        }
      );
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }
};
