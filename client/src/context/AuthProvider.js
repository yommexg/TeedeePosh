import { createContext, useState } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  const decoded = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;
  const userId = decoded?.UserInfo?._id;
  const userName = decoded?.UserInfo?.username;
  const email = decoded?.UserInfo?.email;
  const phoneNumber = decoded?.UserInfo?.phoneNumber;

  return (
    <AuthContext.Provider
      value={{ auth, phoneNumber, setAuth, userId, email, userName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
