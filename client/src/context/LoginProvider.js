import { createContext, useState } from "react";

const LoggedContext = createContext({});

export const LoggedProvider = ({ children }) => {
  const [showLogin, setShowLogin] = useState(false);

  const handleShowLogin = () => {
    setShowLogin(!showLogin);
  };

  return (
    <LoggedContext.Provider
      value={{ showLogin, setShowLogin, handleShowLogin }}
    >
      {children}
    </LoggedContext.Provider>
  );
};

export default LoggedContext;
