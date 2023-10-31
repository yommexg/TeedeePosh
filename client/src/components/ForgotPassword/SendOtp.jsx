import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import axios from "../../api/axios";
import toast from "react-hot-toast";

import Spinner from "../Spinner/Spinner";

const FORGET_URL = "/forgotPassword";

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SendOtp = ({
  setDisable,
  setEmail,
  setGeneratedOTP,
  setStep,
  email,
  handleForgotten,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    const emailTest = EMAIL_REGEX.test(email);

    if (!email) {
      toast.error(
        <div style={{ color: `var(--color-primary-variant)` }}>
          Please Input your Email Address
        </div>,
        {
          duration: 3000,
        }
      );
    } else if (!emailTest) {
      toast.error(
        <div style={{ color: `var(--color-primary-variant)` }}>
          Invalid Email Address
        </div>
      );
    } else {
      setIsLoading(true);
      try {
        const response = await axios.post(
          FORGET_URL,
          {
            email,
          },
          {
            withCredentials: true,
          }
        );
        const data = response?.data;
        setGeneratedOTP(data);
        setStep(2);
        setDisable(true);
      } catch (err) {
        if (err.response?.status === 401) {
          toast.error(
            <div style={{ color: `var(--color-primary-variant)` }}>
              The user with email <strong>{email}</strong> does not exist
            </div>,
            {
              duration: 3000,
            }
          );
        } else {
          toast.error(
            <div style={{ color: `var(--color-primary-variant)` }}>
              NO Server Response
            </div>,
            {
              duration: 3000,
            }
          );
        }
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="step-container">
          <label htmlFor="email">
            <p style={{ color: "white" }}>
              Enter your registered email address:
            </p>
            <div className="input-container">
              <FaEnvelope size={15} className="icon" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                required
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </label>
          <button onClick={handleSendOtp}>Send OTP</button>
          <button onClick={handleForgotten}>Back to Login</button>
        </div>
      )}
    </>
  );
};

export default SendOtp;
