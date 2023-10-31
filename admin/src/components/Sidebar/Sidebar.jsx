import { MdHome } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { IoMdMegaphone } from "react-icons/io";

import { useSidebar } from "../../hooks";

import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import Logo from "../../assets/logo.jpg";
import scrollToTop from "../../utils/scrollToTop";

const Sidebar = () => {
  const { handleSidebar } = useSidebar();

  const handleSidebarContent = () => {
    handleSidebar();
    scrollToTop();
  };

  return (
    <div className="sidebar-wrapper">
      <div className="sidebar-container">
        <div className="home-container">
          <div className="sidebar-content">
            <NavLink
              to="/"
              onClick={handleSidebarContent}
              className={({ isActive }) => (isActive ? "active" : "not-active")}
            >
              <MdHome className="home-icon" onClick={handleSidebarContent} />
              <p>Home</p>
            </NavLink>
          </div>
          <AiOutlineClose
            className="close-icon"
            onClick={handleSidebarContent}
          />
        </div>
        <div className="add-container">
          <NavLink
            to="/brands"
            onClick={handleSidebarContent}
            className={({ isActive }) => (isActive ? "active" : "not-active")}
          >
            <FaRegEye size={24} className="icon" />
            <p>Brands</p>
          </NavLink>
        </div>
        <div className="add-container">
          <NavLink
            to="/categories"
            onClick={handleSidebarContent}
            className={({ isActive }) => (isActive ? "active" : "not-active")}
          >
            <AiOutlineEye size={24} className="icon" />
            <p>Categories</p>
          </NavLink>
        </div>
        <div className="add-container">
          <NavLink
            to="/users"
            onClick={handleSidebarContent}
            className={({ isActive }) => (isActive ? "active" : "not-active")}
          >
            <IoIosPeople size={24} className="icon" />
            <p>Users</p>
          </NavLink>
        </div>
        <div className="add-container">
          <NavLink
            to="/banner"
            onClick={handleSidebarContent}
            className={({ isActive }) => (isActive ? "active" : "not-active")}
          >
            <IoMdMegaphone size={24} className="icon" />
            <p>Banner</p>
          </NavLink>
        </div>
        <div className="add-container">
          <NavLink
            to="/orders"
            onClick={handleSidebarContent}
            className={({ isActive }) => (isActive ? "active" : "not-active")}
          >
            {/* <FaShoppingCart size={24} className="icon" />
            <p>Orders</p> */}
          </NavLink>
        </div>

        <div className="sidebar-brand-name">
          <img src={Logo} alt="Teedeeposh Logo" />
          <p>TeedeePosh</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
