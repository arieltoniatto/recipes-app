import React, { useEffect, useState } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import useContextApp from '../hooks/useContextApp';
import requestById from '../services/fetchById';
import generateIngredient from '../services/generateIngredient';

function RecipeInProgress() {
  const { inProgressRecipes, doneRecipes, getLocal } = useContextApp();
  const [ingredients, setIngredients] = useState([]);
  const [detailsItem, setDetailsItem] = useState({});
  const { id } = useParams();
  const { pathname } = useLocation();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const history = useHistory();

  const pagName = pathname.includes('foods') ? 'meals' : 'cocktails';
  useEffect(() => {
    const initialVerication = () => {
      const localStorege = getLocal('inProgressRecipes');
      console.log(localStorege);
      if (localStorege[pagName][id]) {
        console.log(localStorege[pagName][id]);
        setIngredients([...localStorege[pagName][id]]);
      } else {
        const newList = generateIngredient(detailsItem);
        setIngredients(newList);
      }
    };
    const requestItem = async () => {
      const request = await requestById(pagName, id);

      setDetailsItem(request[0]);
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
      id: type === 'comida' ? detailsItem.idMeal : detailsItem.idDrink,
      type,
      nationality: detailsItem.strArea ? detailsItem.strArea : '',
      category: detailsItem.strCategory ? detailsItem.strCategory : '',
      alcoholicOrNot: type === 'bebida' ? detailsItem.strAlcoholic : '',
      name: type === 'comida' ? detailsItem.strMeal : detailsItem.strDrink,
      image: type === 'comida'
        ? detailsItem.strMealThumb : detailsItem.strDrinkThumb,
      doneDate: new Date().toLocaleString(),
      tags: [...detailsItem.strTags.split(',')],
    };
    const newArrayDone = [...doneRecipes, newRecipesFinish];
    localStorage.setItem('doneRecipes', JSON.stringify(newArrayDone));
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
