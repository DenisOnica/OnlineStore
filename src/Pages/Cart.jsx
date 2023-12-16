import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const Cart = () => {
  const [products, setProducts] = useState(null);
  const [productsInCart, setProductsInCart] = useState(
    JSON.parse(window.localStorage.getItem("cart"))
  );

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

  const getProductById = (id) => {
    const product = products.find((product) => product.id === id);
    return product;
  };

  const handleProductQuantity = (productsInCart, prodyctId, operator) => {
    const currentProduct = productsInCart.find(
      (product) => product.id === prodyctId
    );
    const indexOfProductToBeDeleted = productsInCart.indexOf(currentProduct);
    switch (operator) {
      case "decrease":
        if (currentProduct.qt > 1) currentProduct.qt--;
        break;
      case "increase":
        currentProduct.qt++;
        break;
      case "delete":
        productsInCart.splice(indexOfProductToBeDeleted, 1);
    }

    if (productsInCart.length === 0) {
      localStorage.removeItem("cart");
      setProductsInCart(null);
    } else {
      localStorage.setItem("cart", JSON.stringify(productsInCart));
      setProductsInCart(productsInCart);
    }
  };

  const decreaseQuantity = (e) => {
    const productsInCart =
      JSON.parse(window.localStorage.getItem("cart")) ?? [];
    handleProductQuantity(productsInCart, e.target.id, "decrease");
  };

  const increaseQuantity = (e) => {
    const productsInCart =
      JSON.parse(window.localStorage.getItem("cart")) ?? [];
    handleProductQuantity(productsInCart, e.target.id, "increase");
  };

  const deleteQuantity = (e) => {
    const productsInCart =
      JSON.parse(window.localStorage.getItem("cart")) ?? [];
    handleProductQuantity(productsInCart, e.target.id, "delete");
  };

  return products && productsInCart ? (
    <div className=" p-10 gap-10 flex flex-col justify-center items-center">
      {productsInCart.map((productInCart) => {
        const product = getProductById(productInCart.id);
        return (
          <div
            className="flex gap-10 justify-between items-center"
            key={productInCart.id}
          >
            <p>{product.name}</p>
            <img width={100} src={product.imageURL} alt="product" />
            <p>{product.price}</p>
            <div className="flex gap-5 items-center">
              <button
                id={productInCart.id}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <p>{productInCart.qt}</p>
              <button
                id={productInCart.id}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={increaseQuantity}
              >
                +
              </button>
              <button
                id={productInCart.id}
                className="bg-red-400 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                onClick={deleteQuantity}
              >
                delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  ) : (
    <div>
      Cosul este momentan gol , <Link to="/">adaugati produse</Link>
    </div>
  );
};
