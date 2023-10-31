import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

import "./index.css";
import App from "./App";
import Layout from "./Layout/Layout";

import { AuthProvider } from "./context/AuthProvider";
import { SidebarProvider } from "./context/SidebarProvider";
import { LoadingProvider } from "./context/LoadingProvider";
import { ProductProvider } from "./context/ProductProvider";
import { UsersProvider } from "./context/UsersProvider";
import { ScrollProvider } from "./context/ScrollProvider";
import { SearchProvider } from "./context/SearchProvider";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <ScrollProvider>
          <AuthProvider>
            <UsersProvider>
              <ProductProvider>
                <SidebarProvider>
                  <SearchProvider>
                    <Layout>
                      <Routes>
                        <Route path="/*" element={<App />} />
                      </Routes>
                    </Layout>
                  </SearchProvider>
                </SidebarProvider>
              </ProductProvider>
            </UsersProvider>
          </AuthProvider>
        </ScrollProvider>
      </LoadingProvider>
    </BrowserRouter>
  </React.StrictMode>
);
