import { Link } from "react-router-dom";
import arrayBufferToBase64 from "../../utils/arrayBuffertobase64";
import TextTruncate from "../../utils/textTruncate";

import { useProduct, useScroll } from "../../hooks";

import scrollToTop from "../../utils/scrollToTop";

import "./Brands.css";

const Brands = () => {
  const { brands, setShowDeleteConfirmation } = useProduct();
  const { setVisible } = useScroll();

  const handleLink = () => {
    setVisible(true);
    scrollToTop();
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <div className="products-heading">
        <h2>Brands</h2>
        <p>Add, update and delete brand</p>
      </div>

      <Link to="/add-brand" onClick={handleLink}>
        <p className="add">Add Brand</p>
      </Link>

      {brands?.length < 1 ? (
        <p className="noBrand">Brands Loading...</p>
      ) : (
        <div className="brand-container">
          {brands
            .sort((a, b) => a.brandName.localeCompare(b.brandName))
            .map((brand) => (
              <Link
                to={`/brand-details/${brand.brandName}`}
                key={brand.brandName}
                className="brand"
                onClick={handleLink}
              >
                <div className="brand-img-container">
                  <img
                    src={`data:${
                      brand.brandImg?.contentType
                    };base64,${arrayBufferToBase64(brand.brandImg?.data.data)}`}
                    alt={brand.brandName}
                  />
                </div>
                <p>
                  <TextTruncate
                    text={
                      brand.brandName.charAt(0).toUpperCase() +
                      brand.brandName.slice(1)
                    }
                    maxLength={9}
                  />
                </p>
              </Link>
            ))}
        </div>
      )}
    </>
  );
};

export default Brands;
