import { toast } from "react-hot-toast";
import axios from "../api/axios";

export const handleAdd = async ({
  e,
  navigate,
  userId,
  brandName,
  setLoading,
  brandImage,
  axiosPrivate,
  ADD_URL,
  categoryImage,
  categoryName,
  contentType,
  CONTENT_URL,
  category,
  brand,
  setContent,
}) => {
  const formData = new FormData();

  formData.append("userId", userId);
  formData.append("brandName", brandName);
  formData.append("contentType", contentType);
  formData.append("brandImg", brandImage);
  formData.append("categoryImg", categoryImage);
  formData.append("categoryName", categoryName);

  e.preventDefault();
  if (!userId) {
    navigate("/login");
  } else if (
    brandImage == null &&
    categoryImage == null &&
    !categoryName &&
    !brandName
  ) {
    toast.error(<div className="toast">No Input Yet!!!</div>, {
      duration: 5000,
    });
  } else if (!categoryName && !brandName) {
    toast.error(
      <div className="toast">
        Please Input {brand && <strong>Brand</strong>}{" "}
        {category && <strong>Category</strong>} Name
      </div>,
      {
        duration: 5000,
      }
    );
  } else if (brandImage == null && categoryImage == null) {
    toast.error(
      <div className="toast">
        Please Input {brand && <strong>Brand's Logo</strong>}
        {category && <strong>Category's Image</strong>}
      </div>,
      {
        duration: 5000,
      }
    );
  } else {
    setLoading(true);

    try {
      await axiosPrivate.post(ADD_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTimeout(() => {
        setLoading(false);
      }, 3000);

      const fetchContent = async () => {
        try {
          const response = await axios.get(CONTENT_URL);
          setContent(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchContent();

      toast.success(
        <div className="toast">
          {brand && <strong>{brandName} Brand</strong>}
          {category && <strong>{categoryName} Category</strong>} was added
        </div>,
        {
          duration: 5000,
        }
      );
      if (brand) {
        navigate("/brands");
      } else if (category) {
        navigate("/categories");
      }
    } catch (err) {
      if (!err?.response) {
        toast.error(<div className="toast">No Server Response</div>, {
          duration: 5000,
        });
      } else if (err.response?.status === 409) {
        toast.error(
          <div className="toast">
            {brand && <strong>{brandName} Brand</strong>}
            {category && <strong>{categoryName} Category</strong>} Exists
            Already
          </div>,
          {
            duration: 5000,
          }
        );
      } else if (err.response?.status === 401) {
        toast.error(<div className="toast">Unauthorized</div>, {
          duration: 5000,
        });
      } else {
        toast.error(
          <div className="toast">
            {brand && <strong>Brand</strong>}
            {category && <strong>Category</strong>} could not be added
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
  }
};

export const handleEdit = async ({
  e,
  navigate,
  userId,
  ID,
  brandName,
  setLoading,
  brandImage,
  axiosPrivate,
  EDIT_URL,
  categoryImage,
  categoryName,
  contentType,
  CONTENT_URL,
  category,
  brand,
  setContent,
  brandNameChange,
  categoryNameChange,
  imageChange,
}) => {
  const formData = new FormData();

  formData.append("userId", userId);
  formData.append("brandEditName", brandName);
  formData.append("contentType", contentType);
  formData.append("brandImg", brandImage);
  formData.append("categoryImg", categoryImage);
  formData.append("categoryEditName", categoryName);

  e.preventDefault();
  if (!userId) {
    navigate("/login");
  } else if (
    brandImage == null &&
    categoryImage == null &&
    !categoryName &&
    !brandName
  ) {
    toast.error(<div className="toast">No Input Yet!!!</div>, {
      duration: 5000,
    });
  } else if (brandImage == null && categoryImage == null) {
    toast.error(
      <div className="toast">
        Please Input {brand && <strong>Brand's Logo</strong>}
        {category && <strong>Category's Image</strong>}
      </div>,
      {
        duration: 5000,
      }
    );
  } else if (!brandNameChange && !categoryNameChange && !imageChange) {
    toast.error(<div className="toast">NO Changes Detected</div>, {
      duration: 5000,
    });
  } else if (!categoryName && !brandName) {
    toast.error(
      <div className="toast">
        Please Input {brand && <strong>Brand</strong>}{" "}
        {category && <strong>Category</strong>} Name
      </div>,
      {
        duration: 5000,
      }
    );
  } else {
    setLoading(true);
    try {
      await axiosPrivate.post(`${EDIT_URL}/${ID}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setTimeout(() => {
        setLoading(false);
      }, 2000);

      const fetchContent = async () => {
        try {
          const response = await axios.get(CONTENT_URL);
          setContent(response.data);
        } catch (error) {
          console.error(error);
        }
      };

      fetchContent();
      if ((brandNameChange || categoryNameChange) && imageChange) {
        toast.success(
          <div className="toast">
            {brand && (
              <>
                <strong>{brand.brandName}</strong> brand has been changed to{" "}
                <strong>{brandName}</strong> with its <strong>Logo</strong>
              </>
            )}
            {category && (
              <>
                <strong>{category.categoryName}</strong> category has been
                changed to <strong>{categoryName}</strong> with its{" "}
                <strong>Image</strong>
              </>
            )}{" "}
            was updated
          </div>,
          {
            duration: 5000,
          }
        );
      } else if ((brandNameChange || categoryNameChange) && !imageChange) {
        toast.success(
          <div className="toast">
            {brand && (
              <>
                <strong> {brand.brandName}</strong> brand has been changed to{" "}
                <strong>{brandName}</strong>
              </>
            )}
            {category && (
              <>
                <strong> {category.categoryName}</strong> category has been
                changed to <strong>{categoryName}</strong>
              </>
            )}
          </div>,
          {
            duration: 5000,
          }
        );
      } else if (imageChange && (!brandNameChange || !categoryNameChange)) {
        toast.success(
          <div className="toast">
            {brand && <strong>{brand.brandName} brand's logo </strong>}
            {category && (
              <strong>{category.categoryName} category's Image </strong>
            )}{" "}
            has been changed
          </div>,
          {
            duration: 5000,
          }
        );
      }
      if (brand) {
        navigate("/brands");
      } else if (category) {
        navigate("/categories");
      }
    } catch (err) {
      if (!err?.response) {
        toast.error(<div className="toast">No Server Response</div>, {
          duration: 5000,
        });
      } else if (err.response?.status === 409) {
        toast.error(
          <div className="toast">
            {brand && <strong>{brandName} Brand</strong>}
            {category && <strong>{categoryName} Category</strong>} Exists
            Already
          </div>,
          {
            duration: 5000,
          }
        );
      } else if (err.response?.status === 401) {
        toast.error(<div className="toast">Unauthorized</div>, {
          duration: 5000,
        });
      } else {
        toast.error(
          <div className="toast">
            {brand && <strong>{brandName}Brand</strong>}
            {category && <strong>{categoryName}Category</strong>} could not be
            edited
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
  }
};
