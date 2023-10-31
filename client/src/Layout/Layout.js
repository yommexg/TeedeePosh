import { Footer, Header, Sidebar, Spinner, Checkout } from "../components";
import "./Layout.css";
import { useContent, useCheckout } from "../hooks";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }) => {
  const { products } = useContent();
  const { checkout } = useCheckout();

  return (
    <>
      <Toaster containerClassName="toaster" />
      {checkout ? (
        <Checkout />
      ) : products.length < 1 ? (
        <Spinner />
      ) : (
        <div>
          <header>
            <Header />
          </header>
          <div className="large-sidebar">
            <Sidebar />
          </div>
          <main className="main-container">{children}</main>
          <footer>{products.length > 1 && <Footer />}</footer>
        </div>
      )}
    </>
  );
};

export default Layout;
