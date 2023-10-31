import { Routes, Route } from "react-router-dom";

import "./App.css";
import {
  ForgotPassword,
  ProductDetails,
  Register,
  Home,
  Login,
  Categories,
  Brands,
  Checkout,
  Success,
} from "../components";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="login" element={<Login />} /> */}
        <Route path="checkout" element={<Checkout />} />
        <Route path="success" element={<Success />} />
        <Route path="reset-password" element={<ForgotPassword />} />
        <Route
          path="/product-details/:productId"
          element={<ProductDetails />}
        />
        <Route path="/brand/:brandName" element={<Brands />} />
        <Route path="/category/:categoryName" element={<Categories />} />
      </Routes>
    </div>
  );
}

export default App;
