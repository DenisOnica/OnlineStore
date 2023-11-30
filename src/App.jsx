import Home from "./Pages/Home";
import { Cart } from "./Pages/Cart";
import Admin from "./Pages/Admin";

import NavBar from "./Components/Navbar/index";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar color="white" textColor="black" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
