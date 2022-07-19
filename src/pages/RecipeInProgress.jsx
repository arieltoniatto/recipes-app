import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import useContextApp from '../hooks/useContextApp';
import requestById from '../services/fetchById';
import generateIngredient from '../services/generateIngredient';

function RecipeInProgress() {
  const { detailsItem, inProgressRecipes, doneRecipes } = useContextApp();
  const [ingredients, setIngredients] = useState([]);
  const { id } = useParams();
  const { pathname } = useLocation();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const history = useHistory();

  const pagName = pathname.includes('foods') ? 'meals' : 'cocktails';
  useEffect(() => {
    const initialVerication = () => {
      if (inProgressRecipes.get[pagName][id]) {
        setIngredients([...inProgressRecipes.get[pagName][id]]);
      }
    };
    const requestItem = async () => {
      const request = await requestById(pagName, id);
      const newList = generateIngredient(request[0]);
      setIngredients(newList);
      detailsItem.set({ ...request[0], listIngred: newList });
      initialVerication();
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
    const newRecipesFinish = {
      id: type === 'comida' ? detailsItem.get.idMeal : detailsItem.get.idDrink,
      type,
      nationality: detailsItem.get.strArea ? detailsItem.get.strArea : '',
      category: detailsItem.get.strCategory ? detailsItem.get.strCategory : '',
      alcoholicOrNot: type === 'bebida' ? detailsItem.get.strAlcoholic : '',
      name: type === 'comida' ? detailsItem.get.strMeal : detailsItem.get.strDrink,
      image: type === 'comida'
        ? detailsItem.get.strMealThumb : detailsItem.get.strDrinkThumb,
      doneDate: new Date().toLocaleString(),
      tags: [...detailsItem.get.strTags.split(',')],
    };
    const newArrayDone = [...doneRecipes.get, newRecipesFinish];
    localStorage.setItem('doneRecipes', JSON.stringify(newArrayDone));
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
          <p data-testid="recipe-category">{detailsItem.get.strCategory}</p>
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
          <p data-testid="instructions">{detailsItem.get.strInstructions}</p>
          <button type="button" data-testid="share-btn">Share</button>
          <button type="button" data-testid="favorite-btn">Favorite</button>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ btnDisabled }
            onClick={ onHandleFinish }
          >
            Finish Recipe
          </button>
          <button
            onClick={ () => history.push('/') }
            type="button"
          >
            Vltar para testar
          </button>
        </div>
      )}
    </div>
  );
}

export default RecipeInProgress;
