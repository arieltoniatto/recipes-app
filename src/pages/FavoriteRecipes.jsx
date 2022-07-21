import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIconfrom from '../images/blackHeartIcon.svg';
import './FavoriteRecipes.css';

const FILTER_LIST = ['Food', 'Drink', 'All'];

function FavoriteRecipes() {
  const [favoriteList, setFavotiList] = useState(null);
  const [filtredList, setFiltredList] = useState([]);

  useEffect(() => {
    const requestFavoriteList = () => {
      const request = localStorage.getItem('favoriteRecipes')
        ? JSON.parse(localStorage.getItem('favoriteRecipes')) : [];
      setFavotiList(request);
      setFiltredList(request);
    };
    requestFavoriteList();
  }, []);

  function copyLink(recipe, index) {
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    const newlistDoneRecipes = [...filtredList];
    newlistDoneRecipes[index] = { ...newlistDoneRecipes[index], copy: true };
    setFiltredList(newlistDoneRecipes);
  }

  function filterByType(type) {
    let newList = favoriteList;
    if (type.includes('Food')) {
      newList = newList.filter((item) => item.type === 'food');
    } else if (type.includes('Drink')) {
      newList = newList.filter((item) => item.type === 'drink');
    }
    setFiltredList(newList);
  }

  function removeFavorit(id) {
    const newList = filtredList.filter((item) => item.id !== id);
    setFiltredList(newList);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
  }

  return (
    <div className="main-container-done">
      <Header
        title="Favorite Recipes"
        perfil
        pesquisa={ false }
      />
      <section className="main-container-recipes">
        {FILTER_LIST.map((filtro, index) => (
          <button
            key={ index }
            type="button"
            onClick={ () => filterByType(filtro) }
            data-testid={ `filter-by-${filtro.toLowerCase()}-btn` }
          >
            {filtro}
          </button>
        ))}
      </section>
      <section>
        {favoriteList && (
          <div>
            {filtredList.map((favoriteItem, index) => (
              <div key={ index }>
                <Link to={ `/${favoriteItem.type}s/${favoriteItem.id}` }>
                  <img
                    src={ favoriteItem.image }
                    alt={ favoriteItem.name }
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <h3
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {favoriteItem.name}
                  </h3>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {favoriteItem.nationality
                    ? `${favoriteItem.nationality} - ${favoriteItem.category}`
                    : `${favoriteItem.alcoholicOrNot} - ${favoriteItem.category}` }
                </p>
                {favoriteItem.copy && (<p>Link copied!</p>) }
                <input
                  type="image"
                  src={ shareIcon }
                  alt="share"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => copyLink(favoriteItem, index) }
                />
                <input
                  type="image"
                  src={ blackHeartIconfrom }
                  alt="favorite"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  onClick={ () => removeFavorit(favoriteItem.id) }
                />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default FavoriteRecipes;
