import { toast } from "react-hot-toast";
import axios from "../../api/axios";

const LOGIN_URL = "/auth";

export const handleLogin = async ({
  email,
  setAuth,
  navigate,
  from,
  password,
  setLoading,
}) => {
  if (!password) {
    toast.error(<div className="toast">Please Input Password</div>, {
      duration: 3000,
    });
  } else {
    setLoading(true);
    try {
      const response = await axios.post(
        LOGIN_URL,
        { email, pwd: password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setTimeout(() => {
        setLoading(false);
      }, 2000);
      const accessToken = response?.data?.accessToken;
      setAuth({ accessToken });

      toast.success(`You are Logged in`, {
        duration: 5000,
      });
      navigate(from, { replace: true });
    } catch (err) {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
      if (!err?.response) {
        toast.error(<div className="toast">No Server Response</div>, {
          duration: 5000,
        });
      } else if (err.response?.status === 400) {
        toast.error(<div className="toast">Missing Username or Password</div>, {
          duration: 5000,
        });
      } else if (err.response?.status === 401) {
        toast.error(<div className="toast">Unauthorized</div>, {
          duration: 5000,
        });
      } else {
        toast.error(<div className="toast">Login Failed</div>, {
          duration: 5000,
        });
      }
    }
  }
};
