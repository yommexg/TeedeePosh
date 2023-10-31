import { FaBars } from "react-icons/fa";
import Logo from "../../assets/logo.jpg";

import "./Header.css";
import Sidebar from "../Sidebar/Sidebar";
import SidebarNoUser from "../Sidebar/SidebarNoUser";
import Searchbar from "../Searchbar/Searchbar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { useAuth, useSidebar, useSearch } from "../../hooks";

const Header = () => {
  const { sidebar, handleSidebar } = useSidebar();
  const { userId } = useAuth();
  const { showSearch, handleShowSearch } = useSearch();

  return (
    <>
      {showSearch ? (
        <Searchbar />
      ) : (
        <div className="header-container">
          <div className="sidebar-icon-container">
            <FaBars size={26} className="icon" onClick={handleSidebar} />

            {sidebar && userId ? (
              <Sidebar showSidebar={handleSidebar} />
            ) : (
              sidebar && <SidebarNoUser showSidebar={handleSidebar} />
            )}
          </div>

          <div className="brand-name-container">
            <img
              src={Logo}
              alt="Teedeeposh Logo"
              className="logo"
              width={40}
              height={40}
            />
            <p>TeedeePosh</p>
          </div>
          <div className="search-icon-container">
            {userId && (
              <FontAwesomeIcon
                icon={faSearch}
                color="white"
                className="search-icon"
                onClick={handleShowSearch}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
