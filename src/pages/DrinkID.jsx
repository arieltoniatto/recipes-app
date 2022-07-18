import React, { useContext } from 'react';
import appContext from '../context/appContext';
import './DrinkID.css';

function DrinkID() {
  const { uniqueItem } = useContext(appContext);

  return (
    <div className="drinkid-container">
      <h1>{uniqueItem.get.strDrink}</h1>
      <img
        src={ uniqueItem.get.strDrinkThumb }
        alt={ uniqueItem.get.strMeal }
      />
      <p>{uniqueItem.get.strInstructions}</p>
    </div>
  );
}

export default DrinkID;
