import React from "react";
import { ThreeDots } from "react-loader-spinner";
import logo from "../../assets/logo.jpg";
import { motion } from "framer-motion";

import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <motion.div
        animate={{ rotate: [0, 360, 360, 0], y: [0, -100, -50, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <img src={logo} alt="TeedeePosh" width={60} />
      </motion.div>
      <ThreeDots color="navy" height={50} width={50} className="icon" />
    </div>
  );
};

export default Spinner;
