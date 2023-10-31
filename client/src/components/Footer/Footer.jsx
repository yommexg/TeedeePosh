import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { LuMail } from "react-icons/lu";
import { AiFillInstagram } from "react-icons/ai";

import logo from "../../assets/logo.jpg";
import "./Footer.css";

const phoneNumber = "+2349012819559";
const message =
  "This is TeedeePosh Stores. Please feel free to ask about your orders";

const whatsapp_url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
  message
)}`;

const instagramUsername = "TeeDeePosh";

const instagram_url = `https://www.instagram.com/${instagramUsername}`;

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="logo-container">
        <img src={logo} alt="Teedeeposh" width={30} height={40} />
        <p>Teedeeposh offers quality and confortable wears </p>
      </div>

      <div className="socials-container">
        <h3 className="footer-header">Follow Us</h3>
        <Link to={instagram_url} target="_blank" rel="noopener noreferrer">
          <AiFillInstagram size={30} />
        </Link>
      </div>

      <div className="contact-container">
        <h3 className="footer-header">Contact us</h3>
        <div>
          <Link to={whatsapp_url} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={30} className="icon" />
          </Link>
          <a href="mailto:babalolat6@gmail.com" className="email">
            <LuMail size={30} />
          </a>
        </div>
        <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
      </div>
    </div>
  );
};

export default Footer;
