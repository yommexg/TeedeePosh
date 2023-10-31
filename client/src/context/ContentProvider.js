import { createContext, useState, useEffect } from "react";
import axios from "../api/axios";

const ContentContext = createContext({});

const CATEGORY_URL = "/getCategories";
const BRAND_URL = "/getBrands";
const PRODUCTS_URL = "/getProducts";
const BANNER_URL = "/getBanner";

export const ContentProvider = ({ children }) => {
  const [banner, setBanner] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(PRODUCTS_URL);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBanner = async () => {
      try {
        const response = await axios.get(BANNER_URL);
        setBanner(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(CATEGORY_URL);
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBrands = async () => {
      try {
        const response = await axios.get(BRAND_URL);
        setBrands(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
    fetchBanner();
    fetchBrands();
    fetchCategories();
  }, []);

  return (
    <ContentContext.Provider
      value={{
        products,
        brands,
        categories,
        banner,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContext;
