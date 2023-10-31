import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Spinner from "../Spinner/Spinner";
import axios from "../../api/axios";

const FORGET_URL = "/forgotPassword";

const VerifyOtp = ({
  timer,
  setDisable,
  setGeneratedOTP,
  setStep,
  email,
  setOtp,
  setTimer,
  disable,
  generatedOTP,
  otp,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.value && index < otp.length - 1) {
      document.getElementById(`otpInput-${index + 1}`).focus();
    }
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setTimer((lastTimerCount) => {
        lastTimerCount <= 1 && clearInterval(interval);
        if (lastTimerCount <= 1) setDisable(false);
        if (lastTimerCount <= 0) return lastTimerCount;
        return lastTimerCount - 1;
      });
    }, 1000); //each count lasts for a second
    //cleanup the interval on complete
    return () => clearInterval(interval);
  }, [disable, setDisable, setTimer]);

  const resendOTP = async (e) => {
    e.preventDefault();
    setGeneratedOTP("");
    if (!disable) {
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
        setDisable(true);
        setTimer(180);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        toast.error(
          <div style={{ color: `var(--color-primary-variant)` }}>
            NO Server Response
          </div>,
          {
            duration: 3000,
          }
        );
        setIsLoading(false);
      }
    }
  };

  const handleVerifyOtp = (e) => {
    console.log(otp.join(""));

    e.preventDefault();
    if (otp.some((digit) => !digit.trim())) {
      toast.error(
        <div style={{ color: `var(--color-primary-variant)` }}>
          Please enter a valid OTP.
        </div>,
        {
          duration: 3000,
        }
      );
    } else {
      setIsLoading(true);

      try {
        if (generatedOTP === parseInt(otp.join(""))) {
          setTimeout(() => {
            setIsLoading(false);
          }, 2000);
          setStep(3);
        } else {
          toast.error(
            <div style={{ color: `var(--color-primary-variant)` }}>
              WRONG OTP INPUT
            </div>,
            {
              duration: 3000,
            }
          );
          setIsLoading(false);
        }
      } catch (error) {
        toast.error(
          <div style={{ color: `var(--color-primary-variant)` }}>
            NO Server Response
          </div>,
          {
            duration: 3000,
          }
        );
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="step-container">
          <h5 style={{ color: "white", fontSize: 10 }}>
            Enter the OTP sent to your Phone Number :
          </h5>
          <div className="input-container-otp">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                id={`otpInput-${index}`}
                value={digit}
                onChange={(e) => handleOtpChange(e, index)}
                maxLength={1}
              />
            ))}
          </div>
          <button onClick={handleVerifyOtp}>Verify OTP</button>
          <div className="resend-otp-container">
            <p style={{ color: "white" }}>Didn't recieve code?</p>
            <button
              style={{
                color: disable ? "gray" : "white",
                cursor: disable ? "none" : "pointer",
              }}
              onClick={resendOTP}
            >
              {disable ? `Resend OTP in ${timer}s` : "Resend OTP"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyOtp;
