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

  const addNewProduct = () => {
    const url = "https://652bdb8ed0d1df5273eecf9b.mockapi.io/products";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    fetch(url, options);
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
      <div className="flex flex-col gap-4">
        <div className="flex gap-10">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={product.name}
            className=" border-black border-solid border-2"
            onChange={(e) => {
              const productName = e.target.value;
              setProduct({ ...product, name: productName });
            }}
          />
        </div>
        <div className="flex gap-10">
          <label htmlFor="imageURL">Image URL</label>
          <input
            type="text"
            name="imageURL"
            id="imageURL"
            value={product.imageURL}
            className=" border-black border-solid border-2"
            onChange={(e) => {
              const imageURL = e.target.value;
              setProduct({ ...product, imageURL: imageURL });
            }}
          />
        </div>
        <div className="flex gap-10">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            name="price"
            id="price"
            value={product.price}
            className=" border-black border-solid border-2"
            onChange={(e) => {
              const productPrice = e.target.value;
              setProduct({ ...product, price: productPrice });
            }}
          />
        </div>
        <div className="flex gap-10">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={product.description}
            className=" border-black border-solid border-2"
            onChange={(e) => {
              const productDescription = e.target.value;
              setProduct({ ...product, description: productDescription });
            }}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-20"
          onClick={addNewProduct}
        >
          Save
        </button>
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
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
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
                    className="bg-[red] text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
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
