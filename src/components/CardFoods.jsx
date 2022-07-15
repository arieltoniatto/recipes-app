import React from 'react';
import PropTypes from 'prop-types';
import './CardFoods.css';

function Card({ props: { strMeal, strMealThumb } }) {
  return (
    <div className="card-foods">
      <img src={ strMealThumb } alt={ strMeal } />
      <h4>{strMeal}</h4>
      <hr />
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
