import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ShoppingCartProductCard from "../Components/ShoppingCartProductCard/ShoppingCartProductCard";

export const Cart = () => {
  const [products, setProducts] = useState(null);
  const [productsInCart, setProductsInCart] = useState(
    JSON.parse(window.localStorage.getItem("cart"))
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        "http://localhost:3000/api/products"
      );
      const products = await response.json();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const getProductById = (id) => {
    const product = products.find((product) => product._id === id);
    return product;
  };

  const handleProductQuantity = (productsInCart, productId, action) => {
    let updatedProductsInCart;
    switch (action) {
      case "decrease":
        updatedProductsInCart = productsInCart.map((product) => {
          console.log(product.id);
          if (product.id === productId && product.qt > 1) {
            return { ...product, qt: product.qt - 1 };
          }
          return product;
        });
        break;
      case "increase":
        updatedProductsInCart = productsInCart.map((product) => {
          if (product.id === productId) {
            return { ...product, qt: product.qt + 1 };
          }
          return product;
        });
        break;
      case "delete":
        updatedProductsInCart = productsInCart.filter(
          (product) => product.id !== productId
        );
        break;
    }

    if (updatedProductsInCart.length === 0) {
      localStorage.removeItem("cart");
      setProductsInCart(null);
    } else {
      localStorage.setItem("cart", JSON.stringify(updatedProductsInCart));
      setProductsInCart(updatedProductsInCart);
    }
  };

  const decreaseQuantity = (productId) => {
    const productsInCart =
      JSON.parse(window.localStorage.getItem("cart")) ?? [];
    handleProductQuantity(productsInCart, productId, "decrease");
  };

  const increaseQuantity = (productId) => {
    const productsInCart =
      JSON.parse(window.localStorage.getItem("cart")) ?? [];
    handleProductQuantity(productsInCart, productId, "increase");
  };

  const deleteQuantity = (productId) => {
    const productsInCart =
      JSON.parse(window.localStorage.getItem("cart")) ?? [];
    handleProductQuantity(productsInCart, productId, "delete");
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    productsInCart.forEach((productInCart) => {
      const product = getProductById(productInCart.id);
      if (product) {
        totalPrice += product.price * productInCart.qt;
      }
    });
    return totalPrice;
  };

  const handleBuyButtonClick = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productsInCart), // Sending the list of products in the cart
      });

      if (!response.ok) {
        throw new Error("Failed to process purchase");
      }

      console.log("Purchase successful");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return products && productsInCart ? (
    <div>
      {productsInCart.map((productInCart) => {
        const product = getProductById(productInCart.id);
        return (
          <ShoppingCartProductCard
            key={productInCart.id}
            imageURL={product ? product.imageURL : ""}
            name={product ? product.name : ""}
            price={product ? product.price : ""}
            qt={productInCart.qt}
            decreaseQuantity={() => decreaseQuantity(productInCart.id)}
            increaseQuantity={() => increaseQuantity(productInCart.id)}
            deleteQuantity={() => deleteQuantity(productInCart.id)}
          />
        );
      })}

      <div className="mt-8 flex items-baseline gap-2">
        <div className="text-lg font-semibold">Total Price:</div>
        <div className="text-xl font-bold text-green-600">
          {getTotalPrice()}
        </div>
      </div>
      <button
        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 font-bold"
        onClick={handleBuyButtonClick}
      >
        Buy
      </button>
    </div>
  ) : (
    <div>
      Cosul este momentan gol ,{" "}
      <Link className="underline text-blue-700" to="/products">
        adaugati produse
      </Link>
    </div>
  );
};
