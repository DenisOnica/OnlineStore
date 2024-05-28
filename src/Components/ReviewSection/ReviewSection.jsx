import { useState } from "react";
import PropTypes from "prop-types";
import "./ReviewSection.css";

const ReviewSection = ({ id }) => {
  const [reviews, setReviews] = useState([]);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() !== "" && comment.trim() !== "") {
      try {
        const response = await fetch(
          `http://localhost:3000/api/products/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, comment }),
          }
        );

        if (response.ok) {
          const updatedProduct = await response.json();
          setReviews(updatedProduct.reviews);
          setName("");
          setComment("");
        } else {
          throw new Error("Failed to add review");
        }
      } catch (error) {
        console.error("Error adding review:", error);
        alert("Failed to add review. Please try again.");
      }
    } else {
      alert("Please fill out both fields.");
    }
  };

  return (
    <div className="review-section">
      <h2>Reviews</h2>
      <form className="review-form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit Review</button>
      </form>

      <div>
        {reviews.map((review, index) => (
          <div className="review-item" key={index}>
            <h3>{review.name}</h3>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

ReviewSection.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default ReviewSection;
