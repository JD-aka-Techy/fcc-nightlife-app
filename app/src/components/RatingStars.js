import React from 'react';

export function Star() {
  return <span>★</span>;
}

export function RatingStars({ rating }) {
  return (
    <span>
      {
        [...Array(rating).keys()].map(x => <Star />)
      }
    </span>
  );
}

export default RatingStars;