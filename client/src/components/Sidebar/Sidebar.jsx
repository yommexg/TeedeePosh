import { NavLink } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";

import "./Sidebar.css";
import { useContent, useSidebar } from "../../hooks";
import { arrayBufferToBase64, scrollToTop } from "../../utils";

const Sidebar = () => {
  const {
    handleSidebar,
    showCategories,
    showBrand,
    handleCategories,
    handleBrands,
  } = useSidebar();

  const { brands, categories } = useContent();

  const handleSidebarContent = () => {
    handleSidebar();
    scrollToTop();
  };

  return (
    <div className="sidebar-container">
      <div className="home-container">
        <NavLink
          to="/"
          onClick={handleSidebarContent}
          className={({ isActive }) => (isActive ? "active" : "not-active")}
        >
          <RiHomeFill size={30} className="home-sidebar-icon" />
          <p>Home</p>
        </NavLink>
        <AiOutlineClose
          onClick={handleSidebar}
          className="close-sidebar-icon"
          size={28}
        />
      </div>

      <div className="sidebar-heads">
        <h4
          onClick={handleCategories}
          className={showCategories ? "heads-active" : "heads-not-active"}
        >
          Categories
        </h4>
        <h4
          onClick={handleBrands}
          className={showBrand ? "heads-active" : "heads-not-active"}
        >
          Brands
        </h4>
      </div>
      {showCategories && (
        <div className="sidebar-cat-brand">
          {categories
            .slice(0, categories.length)
            .sort((a, b) => a.categoryName.localeCompare(b.categoryName))
            .map((category) => (
              <NavLink
                to={`/category/${category.categoryName}`}
                key={category.categoryName}
                onClick={handleSidebarContent}
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
              >
                <img
                  src={`data:${
                    category.categoryImg?.contentType
                  };base64,${arrayBufferToBase64(
                    category.categoryImg?.data.data
                  )}`}
                  alt={category.categoryName}
                  height={50}
                  width={50}
                />
                <p>{category.categoryName}</p>
              </NavLink>
            ))}
        </div>
      )}
      {showBrand && (
        <div className="sidebar-cat-brand">
          {brands
            .sort((a, b) => a.brandName.localeCompare(b.brandName))
            .map((brand) => (
              <NavLink
                to={`/brand/${brand.brandName}`}
                key={brand.brandName}
                onClick={handleSidebarContent}
                className={({ isActive }) =>
                  isActive ? "active" : "not-active"
                }
              >
                <img
                  src={`data:${
                    brand.brandImg?.contentType
                  };base64,${arrayBufferToBase64(brand.brandImg?.data.data)}`}
                  alt={brand.brandName}
                  height={50}
                  width={50}
                />
                <p>{brand.brandName}</p>
              </NavLink>
            ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
