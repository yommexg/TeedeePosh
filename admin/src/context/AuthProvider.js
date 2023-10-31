import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const userId = decoded?.UserInfo?._id;

  return (
    <AuthContext.Provider value={{ auth, setAuth, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
