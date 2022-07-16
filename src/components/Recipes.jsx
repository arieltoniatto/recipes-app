import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Recipes.css';
import Card from './Card';

function Recipes({ pag, list }) {
  const [categoryList, setCategoryList] = useState([]);
  console.log(list);

  useEffect(() => {
    const getCategory = async () => {
      const MAX_LENGTH_LIST = 6;
      let TYPE_REQUEST = 'meals';
      let URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      if (pag === 'Drinks') {
        URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
        TYPE_REQUEST = 'drinks';
      }
      const requestList = await fetch(URL)
        .then((response) => response.json())
        .then((lista) => lista[TYPE_REQUEST].slice(0, MAX_LENGTH_LIST));
      setCategoryList(requestList);
    };
    getCategory();
  }, []);

  return (
    <div>
      {categoryList.map((category) => (
        <button
          key={ category.strCategory }
          type="button"
          value={ category.strCategory }
        >
          {category.strCategory}
        </button>
      ))}
      {list.map(({ img, name, index }) => (
        <Card
          key={ index }
          img={ img }
          name={ name }
          index={ index }
        />
      ))}
      <hr />
    </div>
  );
}

export default Recipes;

Recipes.propTypes = {
  pag: PropTypes.string.isRequired,
  list: PropTypes.arrayOf({
    name: PropTypes.string,
    img: PropTypes.string,
    index: PropTypes.number,
  }),
};

Recipes.defaultProps = {
  list: [],
};
