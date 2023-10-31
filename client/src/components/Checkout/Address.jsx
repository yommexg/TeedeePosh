import { toast } from "react-hot-toast";
import { FaArrowLeft, FaAddressCard } from "react-icons/fa";

import { useCheckout, useLogged, useCountries } from "../../hooks";

const Address = ({ setStep }) => {
  const { setCheckout } = useCheckout();
  const { setShowLogin } = useLogged();

  const handleGoback = () => {
    setCheckout(false);
    setShowLogin(false);
  };

  const {
    countries,
    selectedCountry,
    selectedCountryCode,
    handleCountryChange,
    states,
    handleStateChange,
    handleLocalChange,
    selectedStateCode,
    selectedState,
    localGovt,
    selectedlocalGovt,
    homeAdress,
    handleHomeAdressChange,
  } = useCountries();

  const handlePayment = (e) => {
    e.preventDefault();
    if (
      selectedCountryCode === "" ||
      selectedStateCode === "" ||
      selectedlocalGovt === "" ||
      homeAdress.trim() === ""
    ) {
      console.log("Not availiable");
      toast.error(
        <div style={{ color: `var(--color-primary-variant)` }}>
          Address Details is Not complete
        </div>,
        {
          duration: 3000,
        }
      );
    } else {
      setStep(2);
    }
  };

  return (
    <div className="checkout-container">
      <FaArrowLeft onClick={handleGoback} className="goback" />
      <h2>Enter Your delivery address below: </h2>
      <div className="address-input-container">
        <label htmlFor="countries">Country:</label>
        <select value={selectedCountryCode} onChange={handleCountryChange}>
          <option value="">Select Country</option>
          {countries.map((country) => (
            <option
              className="place-option"
              key={country.geonameId}
              value={country.geonameId}
              datainfo={country.countryName}
            >
              {country.countryName}
            </option>
          ))}
        </select>
      </div>
      {selectedCountryCode && states.length > 0 && (
        <div className="address-input-container">
          <label htmlFor="state">State:</label>
          <select value={selectedStateCode} onChange={handleStateChange}>
            <option value="">Select a state</option>
            {states.map((state) => (
              <option
                key={state.geonameId}
                value={state.geonameId}
                datainfo={state.name}
              >
                {state.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedStateCode && localGovt.length > 0 && (
        <div className="address-input-container">
          <label htmlFor="local-govt" className="headers">
            Local Government/District:
          </label>
          <select onChange={handleLocalChange}>
            <option value="">Select Local Govt/District </option>
            {localGovt.map((city) => (
              <option
                key={city.geonameId}
                value={city.geonameId}
                datainfo={city.name}
              >
                {city.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {selectedlocalGovt && selectedCountry && selectedState && (
        <div className="address-input-container">
          <label htmlFor="home-address">Home Address:</label>
          <div className="input-container" style={{ marginTop: 0 }}>
            <FaAddressCard size={15} className="icon" />
            <input
              type="text"
              placeholder="Home Address"
              value={homeAdress}
              onChange={handleHomeAdressChange}
            />
          </div>
        </div>
      )}

      <button onClick={handlePayment}>Procced to Payment</button>
    </div>
  );
};

export default Address;
