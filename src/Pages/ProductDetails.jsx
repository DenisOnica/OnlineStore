import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      const response = await fetch(
        `https://652bdb8ed0d1df5273eecf9b.mockapi.io/products/${id}`
      );
      const productDetails = await response.json();
      setProduct(productDetails);
    };

    fetchProductDetails();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

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
  };

  return (
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
  );
};

export default ProductDetails;
