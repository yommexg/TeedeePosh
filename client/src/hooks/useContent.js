import { useContext } from "react";
import ContentContext from "../context/ContentProvider";

const useContent = () => {
  return useContext(ContentContext);
};

export default useContent;
