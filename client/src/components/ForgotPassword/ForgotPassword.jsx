import React, { useState } from "react";

import VerifyOtp from "./VerifyOtp";
import SendOtp from "./SendOtp";
import ResetPassword from "./ResetPassword";
import "./ForgotPassword.css";

const ForgotPassword = ({ handleForgotten }) => {
  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [generatedOTP, setGeneratedOTP] = useState("");
  const [step, setStep] = useState(1);

  const [disable, setDisable] = useState(true);
  const [timer, setTimer] = useState(60);

  return (
    <div className="forgotten-container">
      {step === 1 && (
        <SendOtp
          setDisable={setDisable}
          setEmail={setEmail}
          setGeneratedOTP={setGeneratedOTP}
          setStep={setStep}
          email={email}
          handleForgotten={handleForgotten}
        />
      )}

      {step === 2 && (
        <VerifyOtp
          timer={timer}
          setDisable={setDisable}
          setGeneratedOTP={setGeneratedOTP}
          setStep={setStep}
          email={email}
          setOtp={setOtp}
          setTimer={setTimer}
          disable={disable}
          generatedOTP={generatedOTP}
          otp={otp}
        />
      )}
      {step === 3 && (
        <ResetPassword
          setStep={setStep}
          email={email}
          handleForgotten={handleForgotten}
        />
      )}
    </div>
  );
};

export default ForgotPassword;
