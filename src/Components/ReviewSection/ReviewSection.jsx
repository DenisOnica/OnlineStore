import { useState } from "react";
import "./ReviewSection.css";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "" && comment.trim() !== "") {
      setReviews([...reviews, { name, comment }]);
      setName("");
      setComment("");
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

export default ReviewSection;
