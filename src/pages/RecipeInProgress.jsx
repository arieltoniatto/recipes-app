import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useLocation, useParams } from 'react-router-dom';
import './RecipeInProgress.css';
import useContextApp from '../hooks/useContextApp';
import requestById from '../services/fetchById';
import generateIngredient from '../services/generateIngredient';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const { inProgressRecipes, getLocal } = useContextApp();
  const [ingredients, setIngredients] = useState([]);
  const [detailsItem, setDetailsItem] = useState({});
  const [favoriteState, setFavoriteState] = useState(false);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [btnDisabled, setBtnDisabled] = useState(true);

  const pagName = pathname.includes('foods') ? 'meals' : 'cocktails';
  useEffect(() => {
    const initialVerication = (param) => {
      const localStorege = getLocal('inProgressRecipes');
      if (localStorege[pagName] && localStorege[pagName][id]) {
        setIngredients([...localStorege[pagName][id]]);
      } else {
        const newList = generateIngredient(param);
        setIngredients(newList);
      }
    };
    const requestItem = async () => {
      const request = await requestById(pathname, id);
      setDetailsItem(request[0]);
      initialVerication(request[0]);
    };
    requestItem();
  }, []);

  useEffect(() => {
    if (ingredients.length !== 0) {
      const newRecipesInProg = { ...inProgressRecipes.get,
        [pagName]: { ...inProgressRecipes.get[pagName], [id]: ingredients } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipesInProg));
    }
  }, [ingredients]);

  async function onHandleCheck(index) {
    console.log(ingredients);
    const newList = [...ingredients];
    newList[index].checked = !newList[index].checked;
    setIngredients(newList);

    if (newList.every((item) => item.checked === true)) {
      setBtnDisabled(false);
    } else if (!btnDisabled) setBtnDisabled(true);
  }
  function onHandleFinish() {
    const type = (pathname.includes('/foods')) ? 'comida' : 'bebida';
    const done = localStorage.getItem('doneRecipes') ? JSON
      .parse(localStorage.getItem('doneRecipes')) : [];
    const newRecipesFinish = {
      id: type === 'comida' ? detailsItem.idMeal : detailsItem.idDrink,
      type,
      nationality: detailsItem.strArea ? detailsItem.strArea : '',
      category: detailsItem.strCategory ? detailsItem.strCategory : '',
      alcoholicOrNot: type === 'bebida' ? detailsItem.strAlcoholic : '',
      name: type === 'comida' ? detailsItem.strMeal : detailsItem.strDrink,
      image: type === 'comida'
        ? detailsItem.strMealThumb : detailsItem.strDrinkThumb,
      doneDate: new Date().toLocaleString(),
      tags: detailsItem.strTags ? [...detailsItem.strTags.split(',')] : [],
    };
    const newArrayDone = [...done, newRecipesFinish];
    localStorage.setItem('doneRecipes', JSON.stringify(newArrayDone));
  }

  function copyLink() {
    copy(`http://localhost:3000${pathname}`);
    setFavoriteState(true);
  }

  return (
    <div className="main-container">
      {detailsItem && (
        <div className="container">
          <img
            data-testid="recipe-photo"
            src={
              detailsItem.strMealThumb
                ? detailsItem.strMealThumb : detailsItem.strDrinkThumb
            }
            alt={ detailsItem.strMeal
              ? detailsItem.strMeal : detailsItem.strDrink }
          />
          <div>
            {favoriteState ? (<p>Link copied!</p>) : (
              <input
                type="image"
                src={ shareIcon }
                alt="share"
                data-testid="share-btn"
                onClick={ copyLink }
              />
            )}
            <input
              type="image"
              src={ whiteHeartIcon }
              alt="favorite"
              data-testid="favorite-btn"
            />
          </div>
          <h1 data-testid="recipe-title">
            { detailsItem.strMeal
              ? detailsItem.strMeal : detailsItem.strDrink }
          </h1>
          <p data-testid="recipe-category">{detailsItem.strCategory}</p>
          <ul>
            {ingredients.map((item, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                <label
                  className={ item.checked ? 'scrached' : 'default' }
                  htmlFor={ `ingredients${index}` }
                >
                  <input
                    type="checkbox"
                    id={ `ingredients${index}` }
                    checked={ item.checked }
                    onChange={ () => onHandleCheck(index) }
                  />
                  {`${item.strIngredient} ${item.strMeasure}`}
                </label>
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{detailsItem.strInstructions}</p>
          <button
            className="finish-recipe-btn"
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ btnDisabled }
            onClick={ onHandleFinish }
          >
            Finish Recipe
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeInProgress;
