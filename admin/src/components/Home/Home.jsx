import { Link } from "react-router-dom";

import Product from "../Product/Product";
import "./Home.css";
import { useProduct, useScroll } from "../../hooks";

const Home = () => {
  const { products } = useProduct();
  const { setVisible } = useScroll();

  return (
    <>
      <div className="products-heading">
        <h2>List of Products</h2>
        <p>Add, update and delete any product</p>
      </div>
      <div className="add-container">
        <Link
          to="/add-product"
          className="add-product-link"
          onClick={() => setVisible(true)}
        >
          <p>Add Product</p>
        </Link>
      </div>
      {products.length < 1 ? (
        <p className="noBrand">Product Loading...</p>
      ) : (
        <div className="products-container">
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default Home;
