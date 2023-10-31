import { createContext, useState } from "react";

const UsersContext = createContext({});

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);

  return (
    <UsersContext.Provider value={{ users, setUsers, orders, setOrders }}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersContext;
