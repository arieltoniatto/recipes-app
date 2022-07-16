import React, { useContext, useEffect, useCallback } from 'react';
import appContext from '../context/appContext';
import Header from '../components/Header';
import CardFoods from '../components/CardFoods';
import './Foods.css';
import fetchByAllFoods from '../services/fetchRequest';

const URL_FIST_REQUEST = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
function Foods() {
  const { cardsList: { set, get } } = useContext(appContext);

  const memoryRequest = useCallback(() => {
    const requestFoods = async () => {
      const itensList = await fetchByAllFoods(URL_FIST_REQUEST, 'Foods');
      set(itensList);
    };
    requestFoods();
  }, [set]);

  useEffect(() => {
    memoryRequest();
  }, [memoryRequest]);

  return (
    <>
      <Header
        title="Foods"
        perfil
        pesquisa
      />

      <div className="foods">
        {get.map((food, index) => (
          <CardFoods
            index={ index }
            key={ food.idMeal }
            img={ food.strMealThumb }
            name={ food.strMeal }
          />
        ))}
      </div>
    </>
  );
}

export default Foods;
