import { useContext } from "react";

import LoggedContext from "../context/LoginProvider";

const useLogged = () => {
  return useContext(LoggedContext);
};

export default useLogged;
