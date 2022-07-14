import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import * as API from '../services/fetchMeals';
import CardFoods from '../components/CardFoods';

function Foods() {
  const [foodsCards, setFoodsCards] = useState([]);

  useEffect(() => {
    const foods = async () => {
      const MAX_FOOD_QTD = 12;
      const comidas = await API.fetchByAllFoods()
        .then((response) => response.meals.slice(0, MAX_FOOD_QTD));
      setFoodsCards(comidas);
    };
    foods();
  }, []);

  return (
    <div>
      <Header
        title="Foods"
        perfil
        pesquisa
      />
      {foodsCards.map((food) => (
        <CardFoods
          key={ food.idMeal }
          props={ { ...food } }
          // dataTest={}
        />
      ))}
      <h1>Teste HOme</h1>
    </div>
  );
}

export default Foods;
