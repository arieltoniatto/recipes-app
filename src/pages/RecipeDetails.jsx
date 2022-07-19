import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import requestById from '../services/fetchById';
import './RecipeDetails.css';
import fetchRecommendation from '../services/fetchRecommendation';
import useContextApp from '../hooks/useContextApp';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recommendations, setRecommendations] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const [done, setDone] = useState(false);
  const history = useHistory();

  const { doneRecipes, detailsItem } = useContextApp();

  const catchIngedients = useCallback(() => {
    if (detailsItem.get) {
      let listIngred = [];
      const MAX_QTD = 20;
      for (let i = 1; i <= MAX_QTD; i += 1) {
        const strIngredient = `strIngredient${i}`;
        const strMeasure = `strMeasure${i}`;
        if (detailsItem.get[strIngredient]) {
          listIngred = [
            ...listIngred,
            { strIngredient: detailsItem.get[strIngredient],
              strMeasure: detailsItem.get[strMeasure],
              checked: false }];
        }
      }
      detailsItem.get.listIngred = listIngred;
      console.log(detailsItem.get);
      setIngredient(listIngred);
    }
  }, [detailsItem.get]);

  useEffect(() => {
    const verificaReceita = () => {
      if (doneRecipes.get.some((item) => item.id === id)) {
        setDone(true);
      }
    };
    verificaReceita();
    catchIngedients();
  }, [catchIngedients, doneRecipes.get, id]);

  useEffect(() => {
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
                {`${item.strIngredient} - ${item.strMeasure}`}
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{detailsItem.strInstructions}</p>

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
          Start Recipe
        </button>
      )}
    </div>
  );
}

export default RecipeDetails;
