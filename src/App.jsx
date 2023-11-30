import { Home } from "./Pages/Home";
import { Cart } from "./Pages/Cart";
import Admin from "./Pages/Admin";

import NavBar from "./Components/NavBar";

import { Routes, Route } from "react-router-dom";

function App() {
  const numbers = [1, 2, 3, 4, 5];
  return (
    <>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={<Home firstNumber={numbers[0]} rest={numbers} />}
        />
        <Route path="/cart" element={<Cart item={"item"} />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
