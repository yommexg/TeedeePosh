import { Routes, Route } from "react-router-dom";

import {
  AddProduct,
  AddBrand,
  AddCategory,
  Login,
  Home,
  Users,
  Brands,
  Categories,
  BrandDetails,
  EditBrand,
  CategoryDetails,
  EditCategory,
  ProductDetails,
  Orders,
  Banner,
  EditProduct,
  RequireAuth,
  Unauthorized,
  UserDetail,

} from "./components";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="*" element={<Unauthorized />} />
          <Route element={<RequireAuth allowedRoles={[5150]} />}>
            <Route path="/" element={<Home />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/add-brand" element={<AddBrand />} />
            <Route path="/add-category" element={<AddCategory />} />
            <Route path="/brands" element={<Brands />} />
            <Route
              path="/brand-details/:brandName"
              element={<BrandDetails />}
            />
            <Route path="/edit-brand/:brandEditName" element={<EditBrand />} />
            <Route path="/categories" element={<Categories />} />
            <Route
              path="/category-details/:categoryName"
              element={<CategoryDetails />}
            />
            <Route
              path="/edit-category/:categoryEditName"
              element={<EditCategory />}
            />

            <Route
              path="/product-details/:productId"
              element={<ProductDetails />}
            />
            <Route path="/edit-product/:productId" element={<EditProduct />} />

            <Route path="/users" element={<Users />} />
            <Route path="/user-details/:userId" element={<UserDetail />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/banner" element={<Banner />} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;
