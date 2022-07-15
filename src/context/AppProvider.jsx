import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import appContext from './appContext';
import fetchByAllFoods from '../services/fetchMeals';

const INITIAL_STATE_USER = {
  email: '',
  senha: '',
};
const URL_FIST_REQUEST = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
function AppProvider({ children }) {
  const [user, setUser] = useState(INITIAL_STATE_USER);
  const [cardsList, setCardList] = useState([]);

  // const requestFoods = async (URL) => {
  //   const QTD_MAX = 12;
  //   const itensList = await fetchByAllFoods(URL)
  //     .then((responsejson) => responsejson.meals.slice(0, QTD_MAX));
  //   setCardList(itensList);
  // };

  useEffect(() => {
    const requestFoods = async () => {
      const itensList = await fetchByAllFoods(URL_FIST_REQUEST, 'Foods');
      setCardList(itensList);
    };
    requestFoods();
  }, []);

  const appData = {
    user: {
      get: user,
      set: setUser,
    },
    cardsList: {
      get: cardsList,
      set: setCardList,
    },
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
