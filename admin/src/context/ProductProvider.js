import { createContext, useState, useEffect } from "react";

import axios from "../api/axios";

const CATEGORY_URL = "/getCategories";
const BRAND_URL = "/getBrands";
const PRODUCTS_URL = "/getProducts";
const BANNER_URL = "/getBanner";

const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [banner, setBanner] = useState([]);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  useEffect(() => {
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

    fetchProducts();
    fetchBrands();
    fetchCategories();
    fetchBanner();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        banner,
        setBanner,
        brands,
        setBrands,
        categories,
        setCategories,
        products,
        setProducts,
        showDeleteConfirmation,
        setShowDeleteConfirmation,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
