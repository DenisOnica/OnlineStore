import { useState, useEffect } from "react";

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
        "https://652bdb8ed0d1df5273eecf9b.mockapi.io/products"
      );
      const products = await response.json();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const addNewProduct = async () => {
    const url = "https://652bdb8ed0d1df5273eecf9b.mockapi.io/products";
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
          "https://652bdb8ed0d1df5273eecf9b.mockapi.io/products"
        );
      }
      const updatedProducts = await updatedResponse.json();
      setProducts(updatedProducts);
    } catch (error) {
      console.log("An error appeared while updating product: ", error);
    }
  };

  const editProduct = async (productID) => {
    const url = `https://652bdb8ed0d1df5273eecf9b.mockapi.io/products/${productID}`;
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
          "https://652bdb8ed0d1df5273eecf9b.mockapi.io/products"
        );
      }
      const updatedProducts = await updatedResponse.json();
      setProducts(updatedProducts);
    } catch (error) {
      console.log("An error appeared while updating product: ", error);
    }
  };

  const deleteProduct = async (productID) => {
    const url = `https://652bdb8ed0d1df5273eecf9b.mockapi.io/products/${productID}`;
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const updatedProducts = products.filter(
        (product) => product.id != productID
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
            onClick={() => editProduct(product.id)}
          >
            Save
          </button>
        </div>
      </div>
      <div>
        <table>
          <thead>
            <th>Name</th>
            <th>Image URL</th>
            <th>Price</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>
                  <img src={product.imageURL} alt="product image" width={80} />
                </td>
                <td>{product.price}</td>
                <td>{product.description}</td>
                <td>
                  <button
                    className="border rounded-md py-2 px-4 mr-2"
                    id={product.id}
                    onClick={(e) => {
                      const productID = e.target.id;
                      setCurrentProductID(productID);
                      const productToBeEdited = products.find(
                        (product) => product.id === productID
                      );
                      setProduct(productToBeEdited);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    id={product.id}
                    className="border rounded-md py-2 px-4 mr-2 bg-red-600"
                    onClick={(e) => deleteProduct(e.target.id)}
                  >
                    Delete
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
