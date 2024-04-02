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
        //"https://652bdb8ed0d1df5273eecf9b.mockapi.io/products"
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
    // Inside handleProductQuantity function:
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

    // Update local storage and state
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
