import { useState, useEffect } from "react";

export const Cart = () => {
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

  const getProductById = (id) => {
    const product = products.find((product) => product.id === id);
    return product;
  };

  const productsInCart = JSON.parse(window.localStorage.getItem("cart"));

  return (
    products && (
      <div className="flex flex-col justify-center items-center">
        {productsInCart.map((productInCart) => {
          const product = getProductById(productInCart.id);
          return (
            <div className="flex" key={productInCart.id}>
              <p>{product.name}</p>
              <img width={100} src={product.imageURL} alt="product" />
              <p>{product.price}</p>
            </div>
          );
        })}
      </div>
    )
  );
};
