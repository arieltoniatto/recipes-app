import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import requestById from '../services/fetchById';
import './RecipeDetails.css';
import fetchRecommendation from '../services/fetchRecommendation';
import useContextApp from '../hooks/useContextApp';
import generateIngredient from '../services/generateIngredient';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recommendations, setRecommendations] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [done, setDone] = useState(false);
  const [continueRecip, setContinueRecip] = useState(false);
  const [favoriteState, setFavoriteState] = useState(false);
  const history = useHistory();

  const { detailsItem, getLocal } = useContextApp();

  const catchIngedients = useCallback(() => {
    if (detailsItem.get) {
      const newList = generateIngredient(detailsItem.get);
      detailsItem.get.listIngred = newList;
      setIngredient(newList);
    }
  }, [detailsItem.get]);

  useEffect(() => {
    const verificaReceita = () => {
      const doneRecipes = localStorage.getItem('doneRecipes') ? JSON
        .parse(localStorage.getItem('doneRecipes')) : [];
      if (doneRecipes.some((item) => item.id === id)) {
        setDone(true);
      }
    };
    verificaReceita();
    catchIngedients();
  }, [catchIngedients, id]);

  useEffect(() => {
    const initialVerication = () => {
      const pagName = pathname.includes('foods') ? 'meals' : 'cocktails';
      const localStore = getLocal('inProgressRecipes');
      if (localStore[pagName] && localStore[pagName][id]) { setContinueRecip(true); }
    };
    initialVerication();
    const requestItem = async () => {
      const request = await requestById(pathname, id);
      detailsItem.set(request[0]);
    };
    const requestRecommendation = async () => {
      const request = await fetchRecommendation(pathname);
      setRecommendations(request);
    };
    requestRecommendation();
    requestItem();
  }, [id, pathname]);

  function startRecipe() {
    if (pathname.includes('/foods')) return history.push(`/foods/${id}/in-progress`);
    return history.push(`/drinks/${id}/in-progress`);
  }

  function copyLink() {
    copy(`http://localhost:3000${pathname}`);
    setFavoriteState(true);
  }

  const youTubeLink = () => detailsItem.get.strYoutube.replace('watch?v=', '/embed/');

  return (
    <div className="main-container">
      {detailsItem.get && (
        <div className="container">
          <img
            data-testid="recipe-photo"
            src={
              detailsItem.get.strMealThumb
                ? detailsItem.get.strMealThumb : detailsItem.get.strDrinkThumb
            }
            alt={ detailsItem.get.strMea
              ? detailsItem.get.strMeal : detailsItem.get.strDrink }
          />
          <div>
            {favoriteState && (<p>Link copied!</p>) }
            <input
              type="image"
              src={ shareIcon }
              alt="share"
              data-testid="share-btn"
              onClick={ copyLink }
            />
            <input
              type="image"
              src={ whiteHeartIcon }
              alt="favorite"
              data-testid="favorite-btn"
            />
          </div>
          <h1 data-testid="recipe-title">
            { detailsItem.get.strMeal
              ? detailsItem.get.strMeal : detailsItem.get.strDrink }
          </h1>
          <p data-testid="recipe-category">{detailsItem.get.strCategory}</p>
          {pathname.includes('/drinks') && (
            <p data-testid="recipe-category">{detailsItem.get.strAlcoholic}</p>)}
          <ul>
            {ingredient.map((item, index) => (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${item.strIngredient} ${item.strMeasure}`}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{detailsItem.get.strInstructions}</p>

          {pathname.includes('/foods') && (<iframe
            data-testid="video"
            width="180"
            height="150"
            src={ youTubeLink() }
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer;
        autoplay; clipboard-write;
        encrypted-media; gyroscope;
        picture-in-picture"
            allowFullScreen
          />)}
          <div className="recomentation-container">
            {recommendations.map((reco, index) => (
              <div
                key={ index }
                data-testid={ `${index}-recomendation-card` }
              >
                <p data-testid={ `${index}-recomendation-title` }>
                  {reco.strMeal ? reco.strMeal : reco.strDrink}
                </p>
                <img
                  src={ reco.strMealThumb ? reco.strMealThumb : reco.strDrinkThumb }
                  alt={ reco.strMeal ? reco.strMeal : reco.strDrink }
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {!done && (
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ startRecipe }
        >
          {continueRecip ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

export default RecipeDetails;
