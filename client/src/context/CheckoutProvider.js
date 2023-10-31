import { createContext, useState } from "react";

const CheckoutContext = createContext({});

export const CheckoutProvider = ({ children }) => {
  const [checkout, setCheckout] = useState(false);

  return (
    <CheckoutContext.Provider value={{ checkout, setCheckout }}>
      {children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContext;
