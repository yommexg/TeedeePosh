import React, { useState, useRef } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { toast } from "react-hot-toast";

import "./Login.css";
import Register from "../Register/Register";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import axios from "../../api/axios";
import { useAuth, useLogged, useCheckout } from "../../hooks";

import Spinner from "../Spinner/Spinner";

const LOGIN_URL = "/auth";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [forgotten, setForgotten] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { setCheckout } = useCheckout();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { handleShowLogin } = useLogged();
  const { setAuth } = useAuth();

  const emailRef = useRef();

  const handleLogin = () => {
    setForgotten(false);
    setIsLogin(true);
  };

  const handlePasswordVisibility = (e) => {
    setShowPassword(!showPassword);
  };
  const handleForgotten = (e) => {
    setForgotten(!forgotten);
  };

  const handleLoginButton = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(
        <div style={{ color: `var(--color-primary-variant)` }}>
          Please Input all Fields!!!
        </div>,
        3000
      );
    } else {
      setIsLoading(true);
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

        toast.success(
          <div style={{ color: `var(--color-primary-variant)` }}>
            Login Successful
          </div>,
          {
            duration: 3000,
          }
        );

        const accessToken = response?.data?.accessToken;
        setAuth({ accessToken });
        setCheckout(true);
        setIsLoading(false);
      } catch (err) {
        if (!err?.response) {
          toast.error(
            <div style={{ color: `var(--color-primary-variant)` }}>
              No Server Response
            </div>,
            {
              duration: 3000,
            }
          );
        } else if (err.response?.status === 401) {
          toast.error(
            <div style={{ color: `var(--color-primary-variant)` }}>
              Wrong Email or Password!!!
            </div>,
            {
              duration: 3000,
            }
          );
        } else {
          toast.error(
            <div style={{ color: `var(--color-primary-variant)` }}>
              Login Failed
            </div>,
            {
              duration: 3000,
            }
          );
        }
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="login-container">
      <div className="headers">
        <h2 className={isLogin ? "active" : ""} onClick={handleLogin}>
          Login
        </h2>
        <h2
          className={!isLogin ? "active" : ""}
          onClick={() => setIsLogin(false)}
        >
          Register
        </h2>
      </div>
      {isLogin ? (
        forgotten ? (
          <ForgotPassword
            handleForgotten={handleForgotten}
            setIsLogin={setIsLogin}
          />
        ) : isLoading ? (
          <Spinner />
        ) : (
          <div className="login-container-details">
            <div className="input-container">
              <FaEnvelope size={15} className="icon" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                required
                ref={emailRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <FaLock size={15} className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            <button onClick={handleLoginButton}>Login</button>
            <div className="forget-password-container">
              <p style={{ color: "white" }}>Forgot your password?</p>
              <button onClick={handleForgotten}>Click Here</button>
            </div>
          </div>
        )
      ) : (
        <Register setIsLogin={setIsLogin} setForgotten={setForgotten} />
      )}
      <MdOutlineCancel
        size={30}
        className="cancel-icon"
        onClick={handleShowLogin}
      />
    </div>
  );
};

export default Login;
