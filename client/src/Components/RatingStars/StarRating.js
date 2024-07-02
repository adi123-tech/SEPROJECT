import React, { useState } from 'react';
import './StarRating.css'; // Import CSS file for styling

const StarRating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  console.log('Received initialRating:', initialRating);

  const handleMouseEnter = (starRating) => {
    setHoverRating(starRating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClick = (starRating) => {
    setRating(starRating);
    onRate(starRating);
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverRating || rating);
        return (
          <span
            key={star}
            className={`star ${isFilled ? 'filled' : ''}`}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            onClick={() => handleClick(star)}
          >
            &#9733; {/* Render star character */}
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
