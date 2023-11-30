import { useState, useEffect } from "react";
import ProductsContainer from "../Components/ProductsContainer/ProductsContainer";

const Home = () => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://652bdb8ed0d1df5273eecf9b.mockapi.io/products"
      );
      const products = await response.json();
      setProducts(products);
    };

    fetchProducts();
  }, []);
  return products ? (
    <ProductsContainer products={products} />
  ) : (
    <div>Loading...</div>
  );
};

export default Home;
