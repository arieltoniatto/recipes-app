import React from 'react';
import PropTypes from 'prop-types';
import './CardFoods.css';

function Card({ img, name, index }) {
  return (
    <div
      data-testid={ `${index}-recipe-card` }
      className="card-foods"
    >
      <img
        data-testid={ `${index}-card-img` }
        src={ img }
        alt={ name }
      />
      <h4
        data-testid={ `${index}-card-name` }
      >
        {name}
      </h4>
      <hr />
    </div>
  );
}

export default Card;

Card.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
