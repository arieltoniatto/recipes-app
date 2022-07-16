import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Recipes.css';
import Card from './Card';
import getCategory from '../services/fetchCategorys';

function Recipes({ pag, list }) {
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    const getListCategory = async () => {
      const newList = await getCategory(pag);
      setCategoryList(newList);
    };
    getListCategory();
  }, [pag]);

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
      {(list.length) && list
        .map((item, index) => (
          <Card
            key={ index }
            img={ item.strMealThumb ? item.strMealThumb : item.strDrinkThumb }
            name={ item.strMeal ? item.strMeal : item.strDrink }
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
  list: PropTypes.arrayOf(Object).isRequired,
};
