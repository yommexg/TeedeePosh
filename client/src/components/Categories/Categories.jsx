import { useParams } from "react-router-dom";

import { useContent } from "../../hooks";
import Products from "../Products/Products";
import arrayBufferToBase64 from "../../utils/arrayBuffertobase64";

import "./Categories.css";

const Categories = () => {
  const { categoryName } = useParams();
  const { products, categories } = useContent();

  const categoryProducts = products.filter(
    (prod) => prod.category === categoryName
  );
  const category = categories.find(
    (category) => category.categoryName === categoryName
  );

  return (
    <div className="category-container">
      <div className="category-title-container">
        <img
          src={`data:${
            category?.categoryImg.contentType
          };base64,${arrayBufferToBase64(category?.categoryImg.data.data)}`}
          alt={categoryName}
          width={150}
          height={150}
        />
        <h1>
          {categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}{" "}
          Category
        </h1>
      </div>
      <div className="products-container">
        {categoryProducts.length >= 1 ? (
          categoryProducts
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((product) => <Products key={product._id} product={product} />)
        ) : (
          <p>No Product Availiable at the moment</p>
        )}
      </div>
    </div>
  );
};

export default Categories;
