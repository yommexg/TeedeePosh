import Products from "../Products/Products";
import HeroBanner from "../Banners/HeroBanner";
import FootBanner from "../Banners/FootBanner";

import { useContent } from "../../hooks";

import "./Home.css";

const Home = () => {
  const { products } = useContent();

  return (
    <>
      {products.length > 1 && <HeroBanner />}
      <div className="products-container">
        {products
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((product) => (
            <Products key={product._id} product={product} />
          ))}
      </div>
      <div className="home-foot-banner">
        {products.length > 1 && <FootBanner />}
      </div>
    </>
  );
};

export default Home;
