import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import './DoneRecipes.css';

const FILTER_LIST = ['Food', 'Drink', 'All'];

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState(null);
  const [filtredList, setFiltredList] = useState([]);

  useEffect(() => {
    const requestDoneRecipes = () => {
      const listRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      setDoneRecipes(listRecipes);
      setFiltredList(listRecipes);
    };
    requestDoneRecipes();
  }, []);

  function copyLink(recipe, index) {
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    const newlistDoneRecipes = [...filtredList];
    newlistDoneRecipes[index] = { ...newlistDoneRecipes[index], copy: true };
    setFiltredList(newlistDoneRecipes);
  }

  function filterByType(type) {
    let newList = doneRecipes;
    if (type.includes('Food')) {
      newList = newList.filter((item) => item.type === 'food');
    } else if (type.includes('Drink')) {
      newList = newList.filter((item) => item.type === 'drink');
    }
    setFiltredList(newList);
  }

  return (
    <div className="main-container-done">
      <Header
        title="Done Recipes"
        perfil
        pesquisa={ false }
      />
      {doneRecipes && (
        <>
          <section>
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
          <section className="main-container-recipes">
            {filtredList.map((recipes, index) => (
              <div className="card-recipe" key={ index }>
                <Link to={ `/${recipes.type}s/${recipes.id}` }>
                  <h3
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {recipes.name}
                  </h3>
                  <img
                    data-testid={ `${index}-horizontal-image` }
                    src={ recipes.image }
                    alt={ recipes.name }
                  />
                </Link>
                {recipes.copy && (<p>Link copied!</p>) }
                <input
                  type="image"
                  src={ shareIcon }
                  alt="share"
                  data-testid={ `${index}-horizontal-share-btn` }
                  onClick={ () => copyLink(recipes, index) }
                />
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {recipes.nationality ? `${recipes.nationality} - ${recipes.category}`
                    : `${recipes.alcoholicOrNot} - ${recipes.category}`}
                </p>
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                >
                  {recipes.doneDate}
                </p>
                <div>
                  {recipes.tags.slice(0, 2).map((tag, index2) => (
                    <p
                      key={ index2 }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      {tag}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </section>

        </>)}
    </div>
  );
}

export default DoneRecipes;
