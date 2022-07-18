import React, { useContext } from 'react';
import appContext from '../context/appContext';
import './FoodID.css';

function FoodID() {
  const { uniqueItem } = useContext(appContext);

  return (
    <div className="foodid-container">
      <h1>{uniqueItem.get.strMeal}</h1>
      <img src={ uniqueItem.get.strMealThumb } alt={ uniqueItem.get.strMeal } />
      <p>{uniqueItem.get.strInstructions}</p>
    </div>
  );
}

export default FoodID;
