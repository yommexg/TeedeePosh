import { createContext, useState } from "react";
import { useProduct } from "../hooks";

const SidebarContext = createContext({});

export const SidebarProvider = ({ children }) => {
  const [sidebar, setSidebar] = useState(false);
  const { showDeleteConfirmation } = useProduct();

  const handleSidebar = () => {
    if (!showDeleteConfirmation) {
      setSidebar(!sidebar);
      if (sidebar) {
        document.body.style.overflow = "auto";
      } else {
        document.body.style.overflow = "hidden";
      }
    }
  };

  return (
    <SidebarContext.Provider value={{ sidebar, setSidebar, handleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export default SidebarContext;
