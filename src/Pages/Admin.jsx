import { useState, useEffect } from "react";
import trashIcon from "../Components/ShoppingCartProductCard/trash_icon.png";

const Admin = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    imageURL: "",
    description: "",
  });
  const [products, setProducts] = useState([]);
  const [currentProductID, setCurrentProductID] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(
        // "https://652bdb8ed0d1df5273eecf9b.mockapi.io/products"
        "http://localhost:3000/api/products"
      );
      const products = await response.json();
      console.log(products);
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const addNewProduct = async () => {
    const url = "http://localhost:3000/api/products"; //"https://652bdb8ed0d1df5273eecf9b.mockapi.io/products";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };

    try {
      const response = await fetch(url, options);
      let updatedResponse;
      if (response.ok) {
        updatedResponse = await fetch(
          "http://localhost:3000/api/products" //"https://652bdb8ed0d1df5273eecf9b.mockapi.io/products"
        );
      }
      const updatedProducts = await updatedResponse.json();
      setProducts(updatedProducts);
    } catch (error) {
      console.log("An error appeared while updating product: ", error);
    }
  };

  const editProduct = async (productID) => {
    const url = `http://localhost:3000/api/products/${productID}`; //`https://652bdb8ed0d1df5273eecf9b.mockapi.io/products/${productID}`;
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    try {
      const response = await fetch(url, options);
      let updatedResponse;
      if (response.ok) {
        updatedResponse = await fetch(
          "http://localhost:3000/api/products" //"https://652bdb8ed0d1df5273eecf9b.mockapi.io/products"
        );
      }
      const updatedProducts = await updatedResponse.json();
      setProducts(updatedProducts);
    } catch (error) {
      console.log("An error appeared while updating product: ", error);
    }
  };

  const deleteProduct = async (productID) => {
    const url = `http://localhost:3000/api/products/${productID}`; //`https://652bdb8ed0d1df5273eecf9b.mockapi.io/products/${productID}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const updatedProducts = products.filter(
        (product) => product._id != productID
      );
      setProducts(updatedProducts);
    }
  };

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={product.name}
            className="mt-1 p-2 border border-gray-300 rounded-md"
            onChange={(e) => {
              const productName = e.target.value;
              setProduct({ ...product, name: productName });
            }}
          />
        </div>
        <div>
          <label htmlFor="imageURL" className="block text-sm font-medium">
            Image URL
          </label>
          <input
            type="text"
            name="imageURL"
            id="imageURL"
            value={product.imageURL}
            className="mt-1 p-2 border border-gray-300 rounded-md"
            onChange={(e) => {
              const imageURL = e.target.value;
              setProduct({ ...product, imageURL: imageURL });
            }}
          />
        </div>
        <div>
          <label htmlFor="price" className="block text-sm font-mediums">
            Price
          </label>
          <input
            type="text"
            name="price"
            id="price"
            value={product.price}
            className="mt-1 p-2 border border-gray-300 rounded-md"
            onChange={(e) => {
              const productPrice = e.target.value;
              setProduct({ ...product, price: productPrice });
            }}
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={product.description}
            className="mt-1 p-2 border border-gray-300 rounded-md"
            onChange={(e) => {
              const productDescription = e.target.value;
              setProduct({ ...product, description: productDescription });
            }}
          />
        </div>
        <div className="flex gap-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-20"
            onClick={addNewProduct}
          >
            Add
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full w-20"
            onClick={() => editProduct(product._id)}
          >
            Save
          </button>
        </div>
      </div>
      <div>
        <table className="min-w-full table-fixed">
          <thead>
            <th className="w-1/6">Name</th>
            <th className="w-1/6">Image URL</th>
            <th className="w-1/6">Price</th>
            <th className="w-1/6">Description</th>
            <th className="w-1/6">Edit</th>
            <th className="w-1/6">Delete</th>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="py-2 text-center">{product.name}</td>
                <td className="py-2 text-center ">
                  <img
                    src={product.imageURL}
                    alt="product image"
                    width={80}
                    className="m-auto"
                  />
                </td>
                <td className="py-2 text-center">{product.price}</td>
                <td className="py-2 text-center">{product.description}</td>
                <td className="flex items-center justify-center space-x-2 py-2">
                  <button
                    className="border rounded-md py-2 px-4 mr-2"
                    id={product._id}
                    onClick={(e) => {
                      const productID = e.target.id;
                      setCurrentProductID(productID);
                      const productToBeEdited = products.find(
                        (product) => product._id === productID
                      );
                      setProduct(productToBeEdited);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    id={product._id}
                    className="border rounded-md py-2 px-4 block m-auto"
                    onClick={(e) => deleteProduct(e.target.id)}
                  >
                    <img src={trashIcon} alt="delete" id={product._id} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
