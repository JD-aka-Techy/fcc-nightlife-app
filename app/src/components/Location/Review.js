import React from 'react';
import moment from 'moment';

// components
import RatingStars from '../RatingStars';

function LocationReview({ review }) {
  return (
    <a href={review.url}>
      <blockquote>
        <q>
          {review.text}
          <RatingStars rating={review.rating} />
        </q>
        <cite>{review.user.name} - {moment(review.time_created).format('MM/YYYY')}</cite>
      </blockquote>
    </a>
  );
}

export default LocationReview;