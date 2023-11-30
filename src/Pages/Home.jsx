import { useState, useEffect } from "react";
import ProductCard from "../Components/Products/ProductCard";

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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Home;
