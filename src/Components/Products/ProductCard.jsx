import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const addProductToCart = (e) => {
    let productsInCart = [];
    if (window.localStorage.getItem("cart")) {
      productsInCart = JSON.parse(window.localStorage.getItem("cart"));
    }
    const productAlreadyAdded = productsInCart.find(
      (product) => product.id === e.target.id
    );
    console.log(productAlreadyAdded);
    if (productAlreadyAdded) {
      productAlreadyAdded.qt++;
    } else {
      console.log(e.target.id);
      productsInCart.push({ id: e.target.id, qt: 1 });
    }

    window.localStorage.setItem("cart", JSON.stringify(productsInCart));

    countAddToCart(e.target.id);
  };

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

  return (
    <div
      key={props.product._id}
      className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md"
    >
      <a
        className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
        href="#"
      >
        <img
          className="object-cover"
          src={props.product.imageURL}
          alt={props.product.name}
        />
      </a>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5 className="text-xl tracking-tight text-slate-900">
            {props.product.name}
          </h5>
        </a>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              {props.product.price}$
            </span>
          </p>
          <div className="flex items-center"></div>
        </div>
        <div className="flex justify-around">
          <button
            id={props.product._id}
            onClick={addProductToCart}
            className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            Add to cart
          </button>
          <button
            id={props.product._id}
            className="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <Link to={`/product/${props.product._id}`}>More info..</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProductCard;
