import { useContext } from "react";

import SidebarContext from "../context/SidebarProvider";

const useSidebar = () => {
  return useContext(SidebarContext);
};

export default useSidebar;
