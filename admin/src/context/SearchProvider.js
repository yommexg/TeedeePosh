import { createContext, useState } from "react";
import { useProduct } from "../hooks";

const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);
  const { showDeleteConfirmation } = useProduct();

  const handleShowSearch = () => {
    if (!showDeleteConfirmation) {
      setShowSearch(!showSearch);
      if (showSearch) {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "hidden";
      }
    }
  };

  return (
    <SearchContext.Provider
      value={{ showSearch, setShowSearch, handleShowSearch }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;
