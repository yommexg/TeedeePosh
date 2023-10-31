import { toast } from "react-hot-toast";
import axios from "../../api/axios";

const CREATE_NEW_BANNER_URL = "/banner/new";
const BANNER_URL = "/getBanner";

export const handleUpdateBanner = async ({
  e,
  setLoading,
  userId,
  productId,
  productDetails,
  discount,
  largeText1,
  largeText2,
  time,
  smallText,
  middleText,
  buttonText,
  fileEdit,
  selectedProduct,
  navigate,
  axiosPrivate,
  setBanner,
}) => {
  const formData = new FormData();
  formData.append("userId", userId);
  formData.append("productId", productId);
  formData.append("details", productDetails);
  formData.append("discount", discount);
  formData.append("largeText1", largeText1);
  formData.append("largeText2", largeText2);
  formData.append("saleTime", time);
  formData.append("smallText", smallText);
  formData.append("midText", middleText);
  formData.append("buttonText", buttonText);
  formData.append("bannerImg", fileEdit);
  formData.append("contentType", selectedProduct?.type);
  formData.append("filename", selectedProduct?.filename);
  e.preventDefault();
  if (!userId) navigate("/login");
  else if (
    !discount ||
    !productDetails ||
    !productId ||
    !middleText ||
    !buttonText ||
    !largeText1 ||
    !largeText2 ||
    !time ||
    !smallText
  ) {
    toast.error(`Incomplete bannner details`, {
      duration: 5000,
    });
  } else {
    setLoading(true);
    try {
      await axiosPrivate.post(CREATE_NEW_BANNER_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(<div className="toast">Banner has been updated</div>, {
        duration: 5000,
      });

      const fetchBanner = async () => {
        try {
          const response = await axios.get(BANNER_URL);
          setBanner(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchBanner();
      navigate("/");
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      toast.error(`Banner could not be updated`, {
        duration: 5000,
      });
    }
  }
};
