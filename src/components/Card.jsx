import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Card.css';

function Card({ img, name, index, id, pag }) {
  const barra = '/';
  const pathname = barra + pag.toLowerCase();
  return (

    <Link to={ `${pathname}/${id}` }>
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
      </div>
    </Link>
  );
}

export default Card;

Card.propTypes = {
  name: PropTypes.string,
  img: PropTypes.string,
  index: PropTypes.number,
  id: PropTypes.string,
  pag: PropTypes.string,
};

Card.defaultProps = {
  name: '',
  img: '',
  index: 0,
  id: '',
  pag: '',
};
