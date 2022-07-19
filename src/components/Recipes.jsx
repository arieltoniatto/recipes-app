import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './Recipes.css';
import Card from './Card';
import Header from './Header';
import { getCategory, getItemByCategory } from '../services/fetchCategorys';
import appContext from '../context/appContext';
import fetchByAllFoods from '../services/fetchRequest';

function Recipes({ pag, list }) {
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const { cardsList } = useContext(appContext);

  useEffect(() => {
    const getListCategory = async () => {
      const newList = await getCategory(pag);
      setCategoryList([...newList, { strCategory: 'All' }]);
    };
    getListCategory();
  }, [pag]);

  async function filterByCategory({ target: { value } }) {
    let URL;
    let request;
    if (value === selectedCategory || value === 'All') {
      if (pag === 'Foods') URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      else URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      request = await fetchByAllFoods(URL, pag);
      return cardsList.set(request);
    }
    request = await getItemByCategory(value, pag);
    cardsList.set(request);
    setSelectedCategory(value);
  }

  return (
    <>
      <div className="fast-search-container">
        {categoryList.map(({ strCategory }) => (
          <button
            className="fast-search-btn btn"
            key={ strCategory }
            type="button"
            value={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ filterByCategory }
          >
            {strCategory}
          </button>
        ))}
        <Header
          title={ pag }
          perfil
          pesquisa
        />
      </div>
      <div className="recipes-main-content" data-testid="card-container">
        {Boolean(list.length) && list
          .map((item, index) => (
            <Card
              key={ index }
              img={ item.strMealThumb ? item.strMealThumb : item.strDrinkThumb }
              name={ item.strMeal ? item.strMeal : item.strDrink }
              index={ index }
              id={ item.idMeal ? item.idMeal : item.idDrink }
              pag={ pag }
            />
          ))}
        <hr />
      </div>
    </>
  );
}

export default Recipes;

Recipes.propTypes = {
  pag: PropTypes.string.isRequired,
  list: PropTypes.arrayOf(Object).isRequired,
};
