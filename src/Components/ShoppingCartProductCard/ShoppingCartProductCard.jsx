import PropTypes from "prop-types";

const ShoppingCartProductCard = (props) => {
  return (
    <div className="bg-gray-100 py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row ">
          <div className="md:w-3/4">
            <div className="bg-white rounded-lg shadow-md p-6 mb-2">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left font-semibold">Product</th>
                    <th className="text-left font-semibold">Price</th>
                    <th className="text-left font-semibold">Quantity</th>
                    <th className="text-left font-semibold"> </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-4">
                      <div className="flex items-center">
                        <img
                          className="h-16 w-16 mr-4"
                          src={props.imageURL}
                          alt="Product image"
                        />
                        <span className="font-semibold">{props.name}</span>
                      </div>
                    </td>
                    <td className="py-4">{props.price}</td>
                    <td className="py-4">
                      <div className="flex items-center">
                        <button
                          className="border rounded-md py-2 px-4 mr-2"
                          onClick={() =>
                            props.decreaseQuantity(props.productId)
                          }
                        >
                          -
                        </button>
                        <span className="text-center w-8">{props.qt}</span>
                        <button
                          className="border rounded-md py-2 px-4 ml-2"
                          onClick={() =>
                            props.increaseQuantity(props.productId)
                          }
                        >
                          +
                        </button>
                        <button
                          className="border rounded-md py-2 px-4 ml-2 bg-red-600"
                          onClick={() => props.deleteQuantity(props.productId)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ShoppingCartProductCard.propTypes = {
  imageURL: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  qt: PropTypes.number.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
  increaseQuantity: PropTypes.func.isRequired,
  deleteQuantity: PropTypes.func.isRequired,
  productId: PropTypes.string.isRequired,
};

export default ShoppingCartProductCard;
