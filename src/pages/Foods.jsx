import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import * as API from '../services/fetchMeals';
import CardFoods from '../components/CardFoods';
import './Foods.css';

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
    <>
      <Header
        title="Foods"
        perfil
        pesquisa
      />

      <div className="foods">
        {foodsCards.map((food) => (
          <CardFoods
            key={ food.idMeal }
            props={ { ...food } }
          />
        ))}
      </div>
    </>
  );
}

export default Foods;
