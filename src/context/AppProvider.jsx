import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import appContext from './appContext';
import fetchByAllFoods from '../services/fetchMeals';

const INITIAL_STATE_USER = {
  email: '',
  senha: '',
};

function AppProvider({ children }) {
  const [user, setUser] = useState(INITIAL_STATE_USER);
  const [cardsList, setCardList] = useState([]);

  useEffect(() => {
    const requestFoods = async () => {
      const URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const QTD_MAX = 12;
      const itensList = await fetchByAllFoods(URL)
        .then((responsejson) => responsejson.meals.slice(0, QTD_MAX));
      setCardList(itensList);
    };
    requestFoods();
  }, []);

  const appData = {
    user: {
      get: user,
      set: setUser,
    },
    cardsList,
  };

  return (
    <appContext.Provider value={ appData }>
      {children}
    </appContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
