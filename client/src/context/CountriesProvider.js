import { createContext, useState, useEffect } from "react";
import axios from "axios";

const CountriesContext = createContext({});

export const CountriesProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");
  const [states, setStates] = useState([]);
  const [localGovt, setLocalGovt] = useState([]);
  const [selectedlocalGovt, setSelectedLocalGovt] = useState("");
  const [homeAdress, setHomeAdress] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "http://api.geonames.org/countryInfoJSON",
          {
            params: {
              username: "yomi",
              type: "JSON",
            },
          }
        );

        // Extract the list of countries from the response
        const countryList = response.data.geonames;

        // Sort countries alphabetically by country name
        const sortedCountries = countryList.sort((a, b) =>
          a.countryName.localeCompare(b.countryName)
        );

        setCountries(sortedCountries);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
      if (selectedCountryCode) {
        try {
          const response = await axios.get(
            "http://api.geonames.org/childrenJSON",
            {
              params: {
                geonameId: selectedCountryCode,
                username: "yomi",
                type: "JSON",
              },
            }
          );

          const stateList = response.data.geonames || [];
          setStates(stateList);
        } catch (error) {
          console.error("Error fetching states:", error);
        }
      }
    };

    fetchStates();
  }, [selectedCountryCode]);

  useEffect(() => {
    const fetchlocalGovt = async () => {
      if (selectedStateCode) {
        try {
          const response = await axios.get(
            "http://api.geonames.org/childrenJSON",
            {
              params: {
                geonameId: selectedStateCode,
                username: "yomi",
                type: "JSON",
              },
            }
          );

          const cityList = response.data.geonames || [];
          setLocalGovt(cityList);
        } catch (error) {
          console.error("Error fetching localGovt:", error);
        }
      }
    };

    fetchlocalGovt();
  }, [selectedStateCode]);

  const handleCountryChange = (event) => {
    const countryCode = event.target.value;
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedCountryInfo = selectedOption.getAttribute("datainfo");
    setSelectedCountryCode(countryCode);
    setSelectedCountry(selectedCountryInfo);
    setStates([]);
    setLocalGovt([]);
  };

  const handleStateChange = (event) => {
    const stateCode = event.target.value;
    setSelectedStateCode(stateCode);

    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedStateInfo = selectedOption.getAttribute("datainfo");
    setSelectedState(selectedStateInfo);
  };

  const handleLocalChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const selectedLocalInfo = selectedOption.getAttribute("datainfo");
    setSelectedLocalGovt(selectedLocalInfo);
  };

  const handleHomeAdressChange = (event) => {
    setHomeAdress(event.target.value);
  };

  return (
    <CountriesContext.Provider
      value={{
        countries,
        selectedCountry,
        selectedCountryCode,
        handleCountryChange,
        states,
        selectedStateCode,
        handleStateChange,
        localGovt,
        selectedState,
        handleLocalChange,
        selectedlocalGovt,
        homeAdress,
        handleHomeAdressChange,
      }}
    >
      {children}
    </CountriesContext.Provider>
  );
};

export default CountriesContext;
