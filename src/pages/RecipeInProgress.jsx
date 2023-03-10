import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import './RecipeInProgress.css';
import useContextApp from '../hooks/useContextApp';
import requestById from '../services/fetchById';
import generateIngredient from '../services/generateIngredient';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIconfrom from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const { getLocal } = useContextApp();
  const [ingredients, setIngredients] = useState([]);
  const [detailsItem, setDetailsItem] = useState({});
  const [copyState, setCopyState] = useState(false);
  const [favoriteState, setFavotiteState] = useState(false);
  const { id } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();
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
      const listFavorit = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (listFavorit.some((item) => item.id === id)) {
        setFavotiteState(true);
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
      const inProgressRecipes = localStorage.getItem('inProgressRecipes') ? JSON
        .parse(localStorage.getItem('inProgressRecipes')) : {};
      const newRecipesInProg = { ...inProgressRecipes,
        [pagName]: { ...inProgressRecipes[pagName], [id]: ingredients } };
      localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipesInProg));
    }
    if (ingredients.every((item) => item.checked === true)) {
      setBtnDisabled(false);
    } else if (!btnDisabled) setBtnDisabled(true);
  }, [ingredients, id, pagName]);

  async function onHandleCheck(index) {
    const newList = [...ingredients];
    newList[index].checked = !newList[index].checked;
    setIngredients(newList);

    if (newList.every((item) => item.checked === true)) {
      setBtnDisabled(false);
    } else if (!btnDisabled) setBtnDisabled(true);
  }
  function onHandleFinish() {
    const type = (pathname.includes('/foods')) ? 'food' : 'drink';
    const done = localStorage.getItem('doneRecipes') ? JSON
      .parse(localStorage.getItem('doneRecipes')) : [];
    const newRecipesFinish = {
      id: type === 'food' ? detailsItem.idMeal : detailsItem.idDrink,
      type,
      nationality: detailsItem.strArea ? detailsItem.strArea : '',
      category: detailsItem.strCategory ? detailsItem.strCategory : '',
      alcoholicOrNot: type === 'drink' ? detailsItem.strAlcoholic : '',
      name: type === 'food' ? detailsItem.strMeal : detailsItem.strDrink,
      image: type === 'food'
        ? detailsItem.strMealThumb : detailsItem.strDrinkThumb,
      doneDate: new Date().toLocaleString(),
      tags: detailsItem.strTags ? [...detailsItem.strTags.split(', ')] : [],
    };
    const newArrayDone = [...done, newRecipesFinish];
    localStorage.setItem('doneRecipes', JSON.stringify(newArrayDone));

    history.push('/done-recipes');
  }

  function copyLink() {
    const replaceName = pathname.replace('/in-progress', '');
    copy(`http://localhost:3000${replaceName}`);
    setCopyState(true);
  }

  function choseFavorit() {
    let listFavorit = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (listFavorit.some((item) => item.id === id)) {
      listFavorit = listFavorit.filter((item) => item.id !== id);
    } else {
      const type = (pathname.includes('/foods')) ? 'food' : 'drink';
      const newObjFavorit = {
        id,
        type,
        nationality: detailsItem.strArea ? detailsItem.strArea : '',
        category: detailsItem.strCategory ? detailsItem.strCategory : '',
        alcoholicOrNot: type === 'drink' ? detailsItem.strAlcoholic : '',
        name: type === 'food' ? detailsItem.strMeal : detailsItem.strDrink,
        image: type === 'food'
          ? detailsItem.strMealThumb : detailsItem.strDrinkThumb,
      };
      listFavorit = [...listFavorit, newObjFavorit];
    }
    setFavotiteState((prev) => !prev);
    localStorage.setItem('favoriteRecipes', JSON.stringify(listFavorit));
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
            { copyState && (<p>Link copied!</p>) }
            <input
              type="image"
              src={ shareIcon }
              alt="share"
              data-testid="share-btn"
              onClick={ copyLink }
            />
            <input
              type="image"
              src={ favoriteState ? blackHeartIconfrom : whiteHeartIcon }
              alt="favorite"
              data-testid="favorite-btn"
              onClick={ choseFavorit }
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
                  data-testid={ `${index}-ingredient-step` }
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
