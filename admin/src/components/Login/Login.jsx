import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./Login.css";
import { useAuth, useLoading, useScroll } from "../../hooks";

import { handleLogin } from "./handleLogin";

const Login = () => {
  const { setAuth } = useAuth();
  const { setLoading } = useLoading();
  const { setVisible } = useScroll();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const emailRef = useRef();

  const handleSubmit = (e) => {
    setVisible(true);
    e.preventDefault();

    handleLogin({
      email,
      setAuth,
      navigate,
      from,
      password,
      setLoading,
    });
  };

  return (
    <section className="login-container">
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          required
          ref={emailRef}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <div className="input-div">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="sign-button" type="submit">
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
