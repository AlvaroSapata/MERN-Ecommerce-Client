import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Shop from "./Pages/Shop";
import Cart from "./Pages/Cart";
import Product from "./Pages/Product";
import Footer from "./Components/Footer/Footer";
import ShopCategory from "./Pages/ShopCategory";
import hoodieBanner from "./Components/Assets/banner_women.png";
import tshirtBanner from "./Components/Assets/banner_mens.png";
import miscBanner from "./Components/Assets/banner_kids.png";
// import tshirt_banner from "./Components/Assets/banner-tshirt.png";
import LoginSignup from "./Pages/LoginSignup";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Shop gender="all" />} />
          <Route
            path="/t-shirts"
            element={<ShopCategory banner={tshirtBanner} category="t-shirts" />}
          />
          <Route
            path="/hoodies"
            element={<ShopCategory banner={hoodieBanner} category="hoodies" />}
          />
          <Route
            path="/misc"
            element={<ShopCategory banner={miscBanner} category="misc" />}
          />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
