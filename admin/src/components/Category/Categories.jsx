import { Link } from "react-router-dom";

import arrayBufferToBase64 from "../../utils/arrayBuffertobase64";
import TextTruncate from "../../utils/textTruncate";
import scrollToTop from "../../utils/scrollToTop";

import { useProduct, useScroll } from "../../hooks";

const Categories = () => {
  const { categories, setShowDeleteConfirmation } = useProduct();
  const { setVisible } = useScroll();

  const handleLink = () => {
    setVisible(true);
    scrollToTop();
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <div className="products-heading">
        <h2>Categories</h2>
        <p>Add, update and delete category</p>
      </div>

      <Link to="/add-category" onClick={handleLink}>
        <p className="add">Add Category</p>
      </Link>

      {categories.length < 1 ? (
        <p className="noBrand">Categories loading....</p>
      ) : (
        <div className="brand-container">
          {categories
            .sort((a, b) => a.categoryName.localeCompare(b.categoryName))
            .map((category) => (
              <Link
                to={`/category-details/${category.categoryName}`}
                key={category.categoryName}
                className="brand"
                onClick={handleLink}
              >
                <div className="brand-img-container">
                  <img
                    src={`data:${
                      category.categoryImg.contentType
                    };base64,${arrayBufferToBase64(
                      category.categoryImg.data.data
                    )}`}
                    alt={category.categoryName}
                  />
                </div>
                <p>
                  <TextTruncate
                    text={
                      category.categoryName.charAt(0).toUpperCase() +
                      category.categoryName.slice(1)
                    }
                    maxLength={10}
                  />
                </p>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default Categories;
