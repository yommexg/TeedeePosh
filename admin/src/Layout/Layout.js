import { Header, Footer, Spinner } from "../components";
import "./Layout.css";
import { Toaster } from "react-hot-toast";
import { useLoading } from "../hooks";

const Layout = ({ children }) => {
  const { loading } = useLoading();

  return (
    <>
      <Toaster containerClassName="toaster" />
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <header>
            <Header />
          </header>

          <main className="main-container">{children}</main>

          <footer>
            <Footer />
          </footer>
        </div>
      )}
    </>
  );
};

export default Layout;
