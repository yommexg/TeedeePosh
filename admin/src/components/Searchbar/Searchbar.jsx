import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import { useSearch, useProduct } from "../../hooks";

import "./Searchbar.css";

import arrayBufferToBase64 from "../../utils/arrayBuffertobase64";
import scrollToTop from "../../utils/scrollToTop";

const Searchbar = () => {
  const { categories, brands, products } = useProduct();
  const navigate = useNavigate();
  const { handleShowSearch } = useSearch();

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);

  const combinedArray = [
    ...brands.map((item) => ({
      name: item.brandName,
      id: item._id,
      data: item.brandImg.data.data,
      type: item.brandImg.contentType,
    })),
    ...categories.map((item) => ({
      name: item.categoryName,
      id: item._id,
      data: item.categoryImg.data.data,
      type: item.categoryImg.contentType,
    })),
    ...products.map((item) => ({
      name: item.name,
      id: item._id,
      data: item.productImg[0].data.data,
      type: item.productImg[0].contentType,
    })),
  ];

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value.trimStart());

    const filtered = combinedArray.filter((item) =>
      item.name
        .replace(/-/g, "")
        .toLowerCase()
        .includes(event.target.value.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const showOptions = searchQuery.trim().length > 0 && filteredItems.length > 0;

  const handleSearch = (item) => {
    handleShowSearch();
    scrollToTop();
    const brandResult = brands.find((brand) => {
      return brand.brandName === item.name && brand._id === item.id;
    });
    const categoryResult = categories.find((category) => {
      return category.categoryName === item.name && category._id === item.id;
    });
    if (brandResult) {
      navigate(`/brand-details/${item.name}`);
    } else if (categoryResult) {
      navigate(`/category-details/${item.name}`);
    } else {
      navigate(`/product-details/${item.id}`);
    }
  };

  return (
    <div className="search-container">
      <FontAwesomeIcon
        icon={faArrowLeft}
        color="blue"
        className="search-icon"
        onClick={handleShowSearch}
      />
      <input
        type="text"
        placeholder="Products, Brands and Category"
        value={searchQuery}
        onChange={handleInputChange}
      />

      {showOptions && (
        <div className="search-result-wrapper">
          <div className="search-result-container">
            {filteredItems
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => (
                <div
                  onClick={() => handleSearch(item)}
                  className="search-result"
                  key={item.id}
                >
                  <img
                    src={`data:${item.type};base64,${arrayBufferToBase64(
                      item.data
                    )}`}
                    width={40}
                    height={40}
                    className="product-image"
                    alt={item.name}
                  />
                  {item.name}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Searchbar;
