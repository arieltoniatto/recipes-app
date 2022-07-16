import React, { useContext, useEffect, useCallback } from 'react';
import Header from '../components/Header';
import appContext from '../context/appContext';
import Recipes from '../components/Recipes';
import fetchByAllFoods from '../services/fetchRequest';
import './Foods.css';
import Footer from '../components/Footer';

const URL_FIST_REQUEST = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
function Drinks() {
  const { cardsList: { set, get } } = useContext(appContext);

  const memoryRequest = useCallback(() => {
    const requestFoods = async () => {
      const itensList = await fetchByAllFoods(URL_FIST_REQUEST, 'Drinks');
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
        title="Drinks"
        perfil
        pesquisa
      />
      <div className="foods">
        <Recipes
          list={ get }
          pag="Drinks"
        />
      </div>
      <Footer />
    </>
  );
}

export default Drinks;
