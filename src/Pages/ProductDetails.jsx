import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ReviewSection from "../Components/ReviewSection/ReviewSection";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch(
        //`https://652bdb8ed0d1df5273eecf9b.mockapi.io/products/${id}`
        `http://localhost:3000/api/products/${id}`
      );
      const productDetails = await response.json();
      console.log(productDetails);
      setProduct(productDetails);
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const countAddToCart = async (id) => {
    try {
      console.log(id);
      const response = await fetch(
        `http://localhost:3000/api/products/${id}/add-to-cart`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: id }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to indicate product purchase");
      }

      console.log("Product added to cart successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addProductToCart = () => {
    let productsInCart = [];
    if (window.localStorage.getItem("cart")) {
      productsInCart = JSON.parse(window.localStorage.getItem("cart"));
    }
    const productAlreadyAdded = productsInCart.find(
      (product) => product.id === id
    );

    if (productAlreadyAdded) {
      productAlreadyAdded.qt++;
    } else {
      productsInCart.push({ id: id, qt: 1 });
    }

    window.localStorage.setItem("cart", JSON.stringify(productsInCart));

    countAddToCart(id);
  };

  return (
    <div>
      <div className="max-w-2xl mx-auto mt-8" key={product.id}>
        <div className="bg-white p-6 rounded-lg shadow-md flex">
          <div className="flex-shrink-0">
            <img
              src={product.imageURL}
              alt={product.name}
              className="h-48 w-48 object-cover rounded-md p-2"
            />
          </div>
          <div className="ml-6">
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <p className="text-gray-800 text-lg font-semibold mb-4">
              Price: ${product.price}
            </p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              onClick={addProductToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <ReviewSection id={id} />
      </div>
    </div>
  );
};

export default ProductDetails;
