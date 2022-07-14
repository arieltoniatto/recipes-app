import React from 'react';
import PropTypes from 'prop-types';

function Card({ props: { strMeal, strMealThumb } }) {
  return (
    <div>
      <h4>{strMeal}</h4>
      <img src={ strMealThumb } alt={ strMeal } />
    </div>
  );
}

export default Card;

Card.propTypes = {
  props: PropTypes.shape({
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }).isRequired,
};
