import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import requestById from '../services/fetchById';
import './RecipeDetails.css';
import fetchRecommendation from '../services/fetchRecommendation';

function RecipeDetails() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [detailsItem, setDetailsItem] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [btnStart, setBtnStart] = useState(false);
  const [ingredient, setIngredient] = useState([]);

  const youTubeLink = () => detailsItem.strYoutube.replace('watch?v=', '/embed/');

  const catchIngedients = useCallback(() => {
    if (detailsItem) {
      const measureList = Object.entries(detailsItem)
        .filter((ingred) => ingred[0].includes('strMeasure'));

      let ingrediente = Object.entries(detailsItem)
        .filter((ingred) => ingred[0].includes('strIngredient'));
      if (pathname.includes('/foods')) {
        ingrediente = ingrediente.filter((f) => f[1] !== '');
      } else {
        ingrediente = ingrediente.filter((f) => f[1] !== null);
      }

      ingrediente = ingrediente.reduce((acc, item, index) => {
        acc = [...acc, { strIngredient: item[1],
          strMeasure: measureList[index][1],
          checked: false }];
        return acc;
      }, []);

      setIngredient(ingrediente);
    }
  }, [detailsItem, pathname]);

  useEffect(() => {
    catchIngedients();
  }, [catchIngedients, detailsItem]);

  useEffect(() => {
    const requestItem = async () => {
      const request = await requestById(pathname, id);
      setDetailsItem(request[0]);
    };
    const requestRecommendation = async () => {
      const request = await fetchRecommendation(pathname);
      setRecommendations(request);
      console.log(request);
    };
    requestRecommendation();
    requestItem();
  }, [id, pathname]);

  function onHandleStart() {
    setBtnStart((prev) => !prev);
  }

  function onHandleCheck(index) {
    const newList = [...ingredient];
    newList[index].checked = !newList[index].checked;
    setIngredient(newList);
  }

  // function mapStuff() {
  //   let newObj = {};
  //   Object.keys(detailsItem).filter((key) => key.includes('strIngredient'))
  //     .reduce((acc, key) => {
  //       newObj = Object.assign(acc, { [key]: detailsItem[key] });
  //       return newObj;
  //     }, {});
  //   return console.log(newObj);
  // }

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
            alt={ detailsItem.strMeal ? detailsItem.strMeal : detailsItem.strDrink }
          />
          <h1 data-testid="recipe-title">
            { detailsItem.strMeal ? detailsItem.strMeal : detailsItem.strDrink }
          </h1>
          <p data-testid="recipe-category">{detailsItem.strCategory}</p>
          {pathname.includes('/drinks') && (
            <p data-testid="recipe-category">{detailsItem.strAlcoholic}</p>)}
          {btnStart ? (
            <ul>
              {ingredient.map((item, index) => (
                <li
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {`${item.strIngredient} - ${item.strMeasure}`}
                </li>
              ))}
            </ul>)
            : (
              <ul>
                {ingredient.map((item, index) => (
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
                      {`${item.strIngredient} - ${item.strMeasure}`}
                    </label>
                  </li>

                ))}
              </ul>
            )}
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
      <button
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        type="button"
        onClick={ onHandleStart }
      >
        Start Recipe
      </button>
    </div>
  );
}

export default RecipeDetails;
