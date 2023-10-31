import React, { useState } from "react";
import InputMask from "react-input-mask";
import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
} from "react-icons/fa";

import axios from "../../api/axios";

import Spinner from "../Spinner/Spinner";
import "./Register.css";
import toast from "react-hot-toast";

const PWD_REGEX =
  /^^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$#!%*?&]{8,24}$/;

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;

const PHONE_REGEX = /^(?:(\+?234)|(0))(?:([5789]\d{9})|([5789]\d{8}))$/;

const REGISTER_URL = "/register";

const Register = ({ setIsLogin, setForgotten }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordVisibility = (e) => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const v1 = USER_REGEX.test(user);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PHONE_REGEX.test(phone);
    const v4 = PWD_REGEX.test(pwd);

    if (!v1 && !v2 && !v3 && !v4) {
      toast.error(
        <div style={{ color: `var(--color-primary-variant)` }}>
          Please Input all Fields
        </div>,
        {
          duration: 3000,
        }
      );
    } else if (!v1) {
      toast.error(
        <div style={{ color: `var(--color-primary-variant)` }}>
          Invalid UserName
        </div>,
        {
          duration: 3000,
        }
      );
    } else if (!v2) {
      toast.error(
        <div style={{ color: `var(--color-primary-variant)`, fontSize: 13 }}>
          Invalid Email Address, Email must include the @ symbol{" "}
        </div>,
        {
          duration: 3000,
        }
      );
    } else if (!v3) {
      toast.error(
        <div style={{ color: `var(--color-primary-variant)` }}>
          Invalid Phone Number
        </div>,
        {
          duration: 3000,
        }
      );
    } else if (!v4) {
      toast.error(
        <div style={{ color: `var(--color-primary-variant)`, fontSize: 11 }}>
          Pasword must contain at least 8 characters, One Uppercase, One Number
          and One Special character, NO SPACES ALLOWED
        </div>,
        {
          duration: 4000,
        }
      );
    } else {
      setIsLoading(true);
      try {
        await axios.post(REGISTER_URL, {
          user,
          pwd,
          email,
          phoneNumber: phone,
        });

        toast.success(
          <div style={{ color: `var(--color-primary-variant)`, fontSize: 13 }}>
            Congratulations, You have an account with TeedeePosh Stores You can
            now Login
          </div>,
          {
            duration: 5000,
          }
        );
        setForgotten(false);
        setIsLogin(true);
      } catch (err) {
        if (!err?.response) {
          toast.error(
            <div style={{ color: `var(--color-primary-variant)` }}>
              No Server Response
            </div>,
            3000
          );
        } else if (err.response?.status === 409) {
          toast.error(
            <div style={{ color: `var(--color-primary-variant)` }}>
              Email is Already Registered
            </div>,
            3000
          );
        } else {
          toast.error(
            <div style={{ color: `var(--color-primary-variant)` }}>
              Registration Failed
            </div>,
            3000
          );
        }
        setUser("");
        setEmail("");
        setPhone("");
        setPwd("");
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
        <div className="register-container">
          <div className="input-container">
            <FaUser className="icon" size={15} />
            <input
              type="text"
              id="username"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              required
              value={user}
              placeholder="Enter UserName"
            />
          </div>
          <div className="input-container">
            <FaEnvelope size={15} className="icon" />
            <input
              value={email}
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email Address"
            />
          </div>
          <div className="input-container">
            <FaPhone className="icon" size={15} />
            <InputMask
              value={phone}
              mask="99999999999"
              maskChar="_"
              type="tel"
              id="phone"
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
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
          <button onClick={handleRegister}>Click Here to Register</button>
        </div>
      )}
    </>
  );
};

export default Register;
