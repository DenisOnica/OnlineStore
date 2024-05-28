import Home from "./Pages/Home";
import { Cart } from "./Pages/Cart";
import Admin from "./Pages/Admin";
import Products from "./Pages/Products";
import ProductStatistics from "./Pages/ProducsStatistics";
import Statistics from "./Pages/Statistics";

import NavBar from "./Components/Navbar/index";

import { Routes, Route } from "react-router-dom";
import ProductDetails from "./Pages/ProductDetails";

function App() {
  return (
    <>
      <NavBar color="white" textColor="black" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/statistics/:productId" element={<ProductStatistics />} />
      </Routes>
    </>
  );
}

export default App;
