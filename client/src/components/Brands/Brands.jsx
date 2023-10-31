import { useParams } from "react-router-dom";

import { useContent } from "../../hooks";
import Products from "../Products/Products";
import arrayBufferToBase64 from "../../utils/arrayBuffertobase64";

import "./Brands.css";

const Brands = () => {
  const { brandName } = useParams();
  const { products, brands } = useContent();

  const brandProducts = products.filter((prod) => prod.brand === brandName);
  const brand = brands.find((brand) => brand.brandName === brandName);

  return (
    <div className="brand-container">
      <div className="brand-title-container">
        <img
          src={`data:${
            brand?.brandImg.contentType
          };base64,${arrayBufferToBase64(brand?.brandImg.data.data)}`}
          alt={brandName}
          width={150}
          height={150}
        />
        <h1>{brandName.charAt(0).toUpperCase() + brandName.slice(1)} Brand</h1>
      </div>
      <div className="products-container">
        {brandProducts.length >= 1 ? (
          brandProducts
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((product) => <Products key={product._id} product={product} />)
        ) : (
          <p>No Product Availiable at the moment</p>
        )}
      </div>
    </div>
  );
};

export default Brands;
