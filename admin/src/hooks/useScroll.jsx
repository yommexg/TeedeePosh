import { useContext } from "react";

import ScrollContext from "../context/ScrollProvider";

const useScroll = () => {
  return useContext(ScrollContext);
};

export default useScroll;
