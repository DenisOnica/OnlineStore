import { useState, useEffect } from "react";
import ProductsContainer from "../Components/ProductsContainer/ProductsContainer";
import Searchbar from "../Components/Searchbar/Searchbar";

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

  const filterProductsByName = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredProductsByName = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue)
    );
    setFilteredProducts(
      filteredProductsByName.length > 0 ? filteredProductsByName : null
    );
  };

  return (
    <div>
      <div className="flex gap-4 p-5 text-center text-2xl justify-center flex-col">
        <Searchbar filterProductsByName={(e) => filterProductsByName(e)} />
        <div className="flex flex-row gap-4 p-5">
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
      </div>
      {filteredProducts ? (
        <ProductsContainer products={filteredProducts} />
      ) : (
        <div>Loading...</div>
      )}
      ;
    </div>
  );
};

export default Products;
