import { toast } from "react-hot-toast";
import axios from "../api/axios";

const PRODUCTS_URL = "/getProducts";
const ADD_PRODUCT_URL = "/products/new";
const EDIT_PRODUCT_URL = "/products/edit";

export const handleAddProduct = async ({
  userId,
  productName,
  productPrice,
  productDetails,
  productDiscount,
  productSize,
  productStock,
  productBrand,
  productCategory,
  productImages,
  contentTypes,
  setLoading,
  setProducts,
  navigate,
  axiosPrivate,
}) => {
  const formData = new FormData();

  formData.append("userId", userId);
  formData.append("name", productName);
  formData.append("price", productPrice);
  formData.append("discount", productDiscount);
  formData.append("details", productDetails);
  formData.append("size", productSize);
  formData.append("brand", productBrand);
  formData.append("category", productCategory);
  formData.append("stock", productStock);

  for (let i = 0; i < productImages.length; i++) {
    formData.append("productImages", productImages[i]);
  }
  for (let i = 0; i < contentTypes.length; i++) {
    formData.append("contentType", contentTypes[i]);
  }
  if (!userId) {
    navigate("/login");
  } else {
    if (
      productName &&
      productBrand &&
      productCategory &&
      productPrice &&
      productDetails &&
      productDiscount &&
      productStock &&
      productSize &&
      productImages.length < 1
    ) {
      toast.error(
        <div className="toast">At least One Product Image is required</div>,
        {
          duration: 5000,
        }
      );
    } else if (
      !productName ||
      !productBrand ||
      !productCategory ||
      !productPrice ||
      !productDetails ||
      !productDiscount ||
      !productStock ||
      !productSize ||
      productImages.length < 1
    ) {
      toast.error(<div className="toast">Please Input empty fields</div>, {
        duration: 5000,
      });
    } else {
      setLoading(true);

      try {
        await axiosPrivate.post(ADD_PRODUCT_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setTimeout(() => {
          setLoading(false);
        }, 3000);

        const fetchProducts = async () => {
          setLoading(true);
          try {
            const response = await axios.get(PRODUCTS_URL);
            setProducts(response.data);
          } catch (error) {
            console.error(error);
          }
          setTimeout(() => {
            setLoading(false);
          }, 5000);
        };

        fetchProducts();

        toast.success(
          <div className="toast">
            <strong>{productName}</strong> was added to the product lists
          </div>,
          {
            duration: 5000,
          }
        );
        navigate("/");
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
          toast.error(<div className="toast">Product could not be added</div>, {
            duration: 5000,
          });
        }

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    }
  }
};

export const handleEditProduct = async ({
  userId,
  productId,
  productName,
  productPrice,
  productDetails,
  productDiscount,
  productSize,
  productStock,
  productBrand,
  productCategory,
  productImages,
  contentTypes,
  setLoading,
  setProducts,
  navigate,
  axiosPrivate,
}) => {
  const formData = new FormData();

  formData.append("userId", userId);
  formData.append("name", productName);
  formData.append("price", productPrice);
  formData.append("discount", productDiscount);
  formData.append("details", productDetails);
  formData.append("size", productSize);
  formData.append("brand", productBrand);
  formData.append("category", productCategory);
  formData.append("stock", productStock);

  for (let i = 0; i < productImages.length; i++) {
    formData.append("productImages", productImages[i]);
  }
  for (let i = 0; i < contentTypes.length; i++) {
    formData.append("contentType", contentTypes[i]);
  }

  if (!userId) navigate("/login");
  else if (
    productName &&
    productBrand &&
    productCategory &&
    productStock &&
    productPrice &&
    productDetails &&
    productDiscount &&
    productSize &&
    productImages.length < 1
  ) {
    toast.error(
      <div className="toast">At least One Product Image is required</div>,
      {
        duration: 5000,
      }
    );
  } else if (
    !productName ||
    !productBrand ||
    !productCategory ||
    !productPrice ||
    !productStock ||
    !productDetails ||
    !productDiscount ||
    !productSize ||
    productImages.length < 1
  ) {
    toast.error(<div className="toast">Please Input empty fields</div>, {
      duration: 5000,
    });
  } else {
    setLoading(true);
    try {
      await axiosPrivate.post(`${EDIT_PRODUCT_URL}/${productId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setTimeout(() => {
        setLoading(false);
      }, 7000);

      const fetchProducts = async () => {
        setLoading(true);
        try {
          const response = await axios.get(PRODUCTS_URL);
          setProducts(response.data);
        } catch (error) {
          console.error(error);
        }
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      };

      fetchProducts();

      toast.success(
        <div className="toast">This product has been updated</div>,
        {
          duration: 5000,
        }
      );
      navigate("/");
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
        toast.error(<div className="toast">Product could not be updated</div>, {
          duration: 5000,
        });
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }
};
