import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { useRefreshToken, useAuth } from "../hooks";

const PersistLogin = () => {
  const [loading, setLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setLoading(false);
  }, [auth, refresh]);

  useEffect(() => {
    console.log(`isLoading: ${loading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [loading, auth]);

  return <>{loading ? "loading" : <Outlet />}</>;
};

export default PersistLogin;
