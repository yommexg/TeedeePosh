import { useContext } from "react";

import LoadingContext from "../context/LoadingProvider";

const useLoading = () => {
  return useContext(LoadingContext);
};

export default useLoading;
