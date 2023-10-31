import { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";

import axios from "../../api/axios";
import toast from "react-hot-toast";
import Spinner from "../Spinner/Spinner";

const RESET_URL = "/forgotPassword/reset";

const PWD_REGEX =
  /^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$#!%*?&]{8,24}$/;

const ResetPassword = ({ setStep, email, handleForgotten }) => {
  const [pwd, setPwd] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordVisibility = (e) => {
    setShowPassword(!showPassword);
  };

  const handleResetPassword = async () => {
    const v2 = PWD_REGEX.test(pwd);

    if (!pwd) {
      toast.error(
        <div style={{ color: `var(--color-primary-variant)` }}>
          Please Input Password
        </div>,
        {
          duration: 3000,
        }
      );
    } else if (!v2) {
      toast.error(
        <div style={{ color: `var(--color-primary-variant)`, fontSize: 11 }}>
          Pasword must contain at least 8 characters, One Uppercase, One Number
          and One Special character, NO SPACES ALLOWED
        </div>,
        {
          duration: 3000,
        }
      );
    } else {
      setIsLoading(true);

      try {
        await axios.post(RESET_URL, {
          email,
          pwd,
        });
        toast.success(
          <div style={{ color: `var(--color-primary)` }}>
            Password has been Successfully Changed. Login with your New password
          </div>,
          {
            duration: 8000,
          }
        );
        setIsLoading(false);
        handleForgotten();
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error(
            <div style={{ color: `var(--color-primary-variant)` }}>
              Email {email} is not registered with Teedeeposh stores
            </div>,
            {
              duration: 3000,
            }
          );
        } else {
          toast.error(
            <div style={{ color: `var(--color-primary-variant)` }}>
              No Server Response
            </div>,
            {
              duration: 3000,
            }
          );
        }

        setIsLoading(false);
        setStep(1);
      }
    }
  };
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="step-container">
          <p style={{ color: "white" }}>Enter New Password:</p>
          <div className="input-container">
            <FaLock size={15} className="icon" />
            <input
              value={pwd}
              type={showPassword ? "text" : "password"}
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              required
              placeholder="Password"
            />
            {showPassword ? (
              <FaEyeSlash
                className="password-icon"
                size={15}
                onClick={handlePasswordVisibility}
              />
            ) : (
              <FaEye
                className="password-icon"
                size={15}
                onClick={handlePasswordVisibility}
              />
            )}
          </div>
          <button onClick={handleResetPassword}>Change Password</button>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
