import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
const Layout = () => {
  return (
    <div>
      <Navbar />
      <ScrollToTop />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
