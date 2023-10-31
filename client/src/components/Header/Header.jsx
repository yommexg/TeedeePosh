import { FaBars } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";

import "./Header.css";

import InfoHeader from "./InfoHeader";
import Sidebar from "../Sidebar/Sidebar";
import Cart from "../Cart/Cart";
import CartSmall from "../Cart/CartSmall";
import Searchbar from "../Searchbar/Searchbar";
import Login from "../Login/Login";

import { useSidebar, useProduct } from "../../hooks";

import Logo from "../../assets/logo.jpg";
import name from "../../assets/name.jpg";

const Header = () => {
  const { handleSidebar, sidebar, handleShowSearch, showSearch } = useSidebar();
  const sidebarRef = useRef();
  const { showCart, handleShowCart, totalQuantities } = useProduct();

  return showSearch ? (
    <Searchbar />
  ) : (
    <>
      <InfoHeader />
      <div className="header-container">
        <div className="sidebar-icon-container">
          <FaBars size={30} className="icon" onClick={handleSidebar} />
        </div>

        {sidebar && (
          <div className="sidebar-wrapper" ref={sidebarRef}>
            <Sidebar />
          </div>
        )}

        <div className="header-brand-container">
          <img src={Logo} alt="Teedeeposh Logo" width={20} />
          <img src={name} alt="Teedeeposh" width={150} />
        </div>

        <div className="search-cart-container">
          <div className="search-icon-container">
            <FontAwesomeIcon
              icon={faSearch}
              color="white"
              className="icon"
              size="xl"
              onClick={handleShowSearch}
            />
          </div>
          <div className="shopping-cart-icon-container">
            <FaShoppingCart
              onClick={handleShowCart}
              size={25}
              className="icon"
            />
            <p>{totalQuantities}</p>
          </div>
          {showCart && <Cart />}
          {showCart && <CartSmall />}
        </div>
      </div>
    </>
  );
};

export default Header;
