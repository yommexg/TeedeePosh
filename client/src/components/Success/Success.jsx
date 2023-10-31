import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { AiOutlineCheckCircle } from "react-icons/ai";
import confetti from "canvas-confetti";

import "./Success.css";

const Success = () => {
  useEffect(() => {
    // Create a confetti effect
    const duration = 15 * 1000; // Duration of the confetti effect in milliseconds
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Since particles fall down, start a bit higher than random
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        })
      );
      confetti(
        Object.assign({}, defaults, {
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        })
      );
    }, 160);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="success-page">
      <canvas id="confetti-canvas" className="confetti-canvas"></canvas>
      <div className="success-content">
        <AiOutlineCheckCircle size={50} color="blue" />
        <h1>Payment Successful!</h1>
        <p>Thank you for your purchase.</p>
        <p>Your Order is Completed</p>
        <Link to="/">
          <button className="back-button">Back to Home</button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
