import React, { useContext } from 'react';
import appContext from '../context/appContext';
import Header from '../components/Header';
import CardFoods from '../components/CardFoods';
import './Foods.css';

function Foods() {
  const { cardsList } = useContext(appContext);

  return (
    <>
      <Header
        title="Foods"
        perfil
        pesquisa
      />

      <div className="foods">
        {cardsList.get.map((food) => (
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
