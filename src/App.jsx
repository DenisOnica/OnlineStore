import { Home } from "./Pages/Home";
import { Cart } from "./Pages/Cart";
import Admin from "./Pages/Admin";

import NavBar from "./Components/Navbar";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <NavBar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
