import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import App from "./Apps/App";
import Layout from "./Layout/Layout";
import { AuthProvider } from "./context/AuthProvider";
import { LoggedProvider } from "./context/LoginProvider";
import { SidebarProvider } from "./context/SidebarProvider";
import { ProductProvider } from "./context/ProductProvider";
import { CheckoutProvider } from "./context/CheckoutProvider";
import { CountriesProvider } from "./context/CountriesProvider";
import { ContentProvider } from "./context/ContentProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CountriesProvider>
        <CheckoutProvider>
          <ContentProvider>
            <ProductProvider>
              <SidebarProvider>
                <AuthProvider>
                  <LoggedProvider>
                    <Layout>
                      <Routes>
                        <Route path="/*" element={<App />} />
                      </Routes>
                    </Layout>
                  </LoggedProvider>
                </AuthProvider>
              </SidebarProvider>
            </ProductProvider>
          </ContentProvider>
        </CheckoutProvider>
      </CountriesProvider>
    </BrowserRouter>
  </React.StrictMode>
);
