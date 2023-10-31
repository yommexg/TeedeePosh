import { Link } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

import "./Sidebar.css";
import Logo from "../../assets/logo.jpg";

const SidebarNoUser = ({ showSidebar }) => {
  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-container">
        <AiOutlineClose
          size={23}
          className="close-icon"
          onClick={showSidebar}
        />

        <Link to="/login" onClick={showSidebar} className="sidebarNoUser-login">
          Sign In to Admin Page
        </Link>

        <div className="sidebar-brand-name">
          <img src={Logo} alt="Teedeeposh Logo" />
          <p>TeedeePosh</p>
        </div>
      </div>
    </div>
  );
};

export default SidebarNoUser;
