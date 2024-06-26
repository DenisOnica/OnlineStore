import PropTypes from "prop-types";
import ProductCard from "../Products/ProductCard";

const ProductsContainer = (props) => {
  const ProductsContainerTailwindClasses =
    "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4";
  return (
    <div className={ProductsContainerTailwindClasses}>
      {props.products.map((product) => (
        <div key={product._id}>
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

ProductsContainer.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ProductsContainer;
