import { PropTypes } from "prop-types";

export const Home = ({ firstNumber, ...rest }) => {
  return (
    <div>
      <h3>Home</h3>
      <h3>The first number is {firstNumber}</h3>
      <h3>the rest of the array is {JSON.stringify(rest)}</h3>
    </div>
  );
};

Home.propTypes = {
  firstNumber: PropTypes.number,
  rest: PropTypes.array,
};
