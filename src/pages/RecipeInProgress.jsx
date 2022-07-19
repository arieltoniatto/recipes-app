import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import useContextApp from '../hooks/useContextApp';

function RecipeInProgress() {
  const { detailsItem, inProgressRecipes } = useContextApp();
  const [ingredients, setIngredients] = useState([]);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [btnDisabled, setBtnDisabled] = useState(true);
  console.log(detailsItem);

  useEffect(() => {
    let pagName;
    const initialVerication = () => {
      pagName = pathname.includes('foods') ? 'meals' : 'cocktails';
      if (inProgressRecipes.get[pagName][id]) {
        setIngredients(inProgressRecipes.get[pagName][id]);
      }
      setIngredients(detailsItem.get.listIngred);
    };
    initialVerication();
    return () => {
      if (!ingredients.every((item) => item.checked === true)) {
        const newRecipesInProg = { ...inProgressRecipes.get,
          [pagName]: { ...inProgressRecipes.get[pagName], [id]: ingredients } };
        localStorage.setItem('inProgressRecipes', JSON.stringify(newRecipesInProg));
      }
    };
  }, []);

  function onHandleCheck(index) {
    const newList = { ...detailsItem.get };
    newList.listIngred[index].checked = !newList.listIngred[index].checked;
    detailsItem.set(newList);
    if (newList.listIngred.every((item) => item.checked === true)) {
      setBtnDisabled(false);
    } else if (!btnDisabled) setBtnDisabled(true);
  }

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
            alt={ detailsItem.get.strMeal
              ? detailsItem.get.strMeal : detailsItem.get.strDrink }
          />
          <h1 data-testid="recipe-title">
            { detailsItem.get.strMeal
              ? detailsItem.get.strMeal : detailsItem.get.strDrink }
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
                  {`${item.strIngredient} - ${item.strMeasure}`}
                </label>
              </li>
            ))}
          </ul>
          <p data-testid="instructions">{detailsItem.strInstructions}</p>
          <button type="button" data-testid="share-btn">Share</button>
          <button type="button" data-testid="favorite-btn">Favorite</button>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ btnDisabled }
          >
            Finish Recipe
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeInProgress;
