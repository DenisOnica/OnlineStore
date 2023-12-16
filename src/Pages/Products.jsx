import { useState, useEffect } from "react";
import ProductsContainer from "../Components/ProductsContainer/ProductsContainer";

const Products = () => {
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "https://652bdb8ed0d1df5273eecf9b.mockapi.io/products"
      );
      const products = await response.json();
      setProducts(products);
      setFilteredProducts(products);
    };

    fetchProducts();
  }, []);

  const onChangeFilteredPrice = (e, startPrice, endPrice) => {
    if (e.target.checked) {
      filterProductsByPrice(startPrice, endPrice);
    } else {
      setFilteredProducts(products);
    }
  };

  const filterProductsByPrice = (startPrice, endPrice) => {
    const filteredProductsByPrice = products.filter(
      (product) => product.price > startPrice && product.price <= endPrice
    );
    setFilteredProducts(filteredProductsByPrice);
  };

  return filteredProducts ? (
    <div>
      <div className="flex gap-4 p-5 text-center text-2xl">
        <div>
          <input
            className="h-6 w-6"
            type="checkbox"
            name="filter1"
            id="filter1"
            onChange={(e) => {
              onChangeFilteredPrice(e, 0, 499);
            }}
          />
          <label htmlFor="filter1">0 - 499 lei</label>
        </div>
        <div>
          <input
            className="h-6 w-6"
            type="checkbox"
            name="filter2"
            id="filter1"
            onChange={(e) => {
              onChangeFilteredPrice(e, 500, Infinity);
            }}
          />
          <label htmlFor="filter2"> &gt; 500 lei</label>
        </div>
      </div>

      <ProductsContainer products={filteredProducts} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default Products;
