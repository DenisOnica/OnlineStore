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

  const handleProductQuantity = (productsInCart, prodyctId, action) => {
    const currentProduct = productsInCart.find(
      (product) => product.id === prodyctId
    );
    const indexOfProductToBeDeleted = productsInCart.indexOf(currentProduct);
    console.log(indexOfProductToBeDeleted);
    switch (action) {
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
            imageURL={product.imageURL}
            name={product.name}
            price={product.price}
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
