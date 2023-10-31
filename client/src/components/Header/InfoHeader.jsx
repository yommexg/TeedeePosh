import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import video1 from "../../assets/header1.mp4";
import video2 from "../../assets/header2.mp4";
import video3 from "../../assets/header3.mp4";
import video4 from "../../assets/header4.mp4";

import "./Header.css";

const phoneNumber = "+2349012819559";
const message = "Hello Please I want to have my shoe cleaned";

const whatsapp_url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
  message
)}`;

const infoHeaderArray = [
  { message: "Welcome to TeeDeePosh Stores", video: video1 },
  { message: "Get your favorite quality wears", video: video2 },
  {
    message: "Delivery Services Availiable",
    video: video3,
  },
  {
    message: "To wash your foot wears",
    button: "Click Here",
    video: video4,
  },
];

const InfoHeader = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentHeader, setCurrentHeader] = useState(
    infoHeaderArray[0].message
  );
  const [show, handleShow] = useState(true);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 60) {
        handleShow(false);
      } else {
        handleShow(true);
      }
    });
    // return () => {
    //   window.removeEventListener("scroll");
    // };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const nextIndex = (currentIndex + 1) % infoHeaderArray.length;
      setCurrentIndex(nextIndex);
      setCurrentHeader(infoHeaderArray[nextIndex].message);
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  const currentInfo = infoHeaderArray.find(
    (info) => info.message === currentHeader
  );

  return (
    <div className="info-header">
      <div className="info-header-video">
        <video
          autoPlay
          src={currentInfo.video}
          loop
          muted
          className="info-header-video"
        />
      </div>
      <div className="current-info-header-container">
        <h3>{currentHeader}</h3>
        {currentInfo.button && (
          <Link to={whatsapp_url} target="_blank" rel="noopener noreferrer">
            {currentInfo.button}
          </Link>
        )}
      </div>
    </div>
  );
};

export default InfoHeader;
