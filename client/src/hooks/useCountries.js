import { useContext } from "react";

import CountriesContext from "../context/CountriesProvider";

const useCountries = () => {
  return useContext(CountriesContext);
};

export default useCountries;
