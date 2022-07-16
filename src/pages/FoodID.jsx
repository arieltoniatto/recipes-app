import React, { useContext } from 'react';
import appContext from '../context/appContext';

function FoodID() {
  const { uniqueItem } = useContext(appContext);

  return (
    <div>
      <h1>OI</h1>
      <h1>{uniqueItem.get.strMeal}</h1>
      <img src={ uniqueItem.get.strMealThumb } alt={ uniqueItem.get.strMeal } />
      <p>{uniqueItem.get.strInstructions}</p>
    </div>
  );
}

export default FoodID;
