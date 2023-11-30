import { PropTypes } from "prop-types";

export const Cart = (props) => {
  return (
    <div>
      <h3>Cart</h3>
      <h3>The item is {props.item ?? "no items"} </h3>
    </div>
  );
};

Cart.propTypes = {
  item: PropTypes.string,
};
