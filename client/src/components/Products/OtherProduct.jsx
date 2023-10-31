import "./OtherProduct.css";
import Products from "./Products";

import { intertwineArrays } from "../../utils";

const OtherProduct = ({ selectedProduct, products }) => {
  const otherProducts = products.filter((selectedProduct) => selectedProduct);

  const brandProducts = otherProducts.filter(
    (prod) => prod.brand === selectedProduct?.brand
  );

  const categoryProducts = otherProducts.filter(
    (prod) => prod.category === selectedProduct?.category
  );

  const combinedProductsArray = intertwineArrays(
    brandProducts,
    categoryProducts
  );

  const combinedOtherProductArray = combinedProductsArray.filter(
    (prod) => prod._id !== selectedProduct._id
  );

  return (
    <div className="maylike-products-wrapper">
      <h2>You may also Like</h2>
      <div className="marquee">
        <div className="maylike-products-container track">
          {combinedOtherProductArray.map((item) => (
            <Products key={item._id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default OtherProduct;
