import { createContext, useState } from "react";

const SidebarContext = createContext({});

export const SidebarProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [showBrand, setShowBrand] = useState(false);

  const handleShowSearch = () => setShowSearch(!showSearch);

  const handleCategories = () => {
    setShowCategories(true);
    setShowBrand(false);
  };

  const handleBrands = () => {
    setShowCategories(false);
    setShowBrand(true);
  };

  const handleSidebar = () => {
    setSidebar(!sidebar);
    if (showCategories) {
      handleCategories();
    } else {
      handleBrands();
    }
  };

  return (
    <SidebarContext.Provider
      value={{
        sidebar,
        handleSidebar,
        handleShowSearch,
        showSearch,
        showBrand,
        setShowBrand,
        showCategories,
        setShowCategories,
        handleCategories,
        handleBrands,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
