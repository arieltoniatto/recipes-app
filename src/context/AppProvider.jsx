import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import appContext from './appContext';

const INITIAL_STATE_USER = {
  email: '',
  senha: '',
};
const INITIAL_PROGRESS_RECIPES = {
  cocktails: {},
  meals: {},
};

function AppProvider({ children }) {
  const [user, setUser] = useState(INITIAL_STATE_USER);
  const [cardsList, setCardList] = useState([]);
  const [detailsItem, setDetailsItem] = useState(null);
  const [uniqueItem, setUniqueItem] = useState({});

  useEffect(() => {
    const inicialLocalStorage = () => {
      if (!localStorage.getItem('doneRecipes')) {
        localStorage.setItem('doneRecipes', JSON.stringify([]));
      }
      if (!localStorage.getItem('favoriteRecipes')) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      }
      if (!localStorage.getItem('inProgressRecipes')) {
        localStorage
          .setItem('inProgressRecipes', JSON.stringify(INITIAL_PROGRESS_RECIPES));
      }
    };
    inicialLocalStorage();
  }, []);

  function getLocal(params) {
    const localStore = localStorage.getItem(params);
    if (localStore) {
      return JSON.parse(localStore);
    }
    return {};
  }

  const appData = {
    user: {
      get: user,
      set: setUser,
    },
    cardsList: {
      get: cardsList,
      set: setCardList,
    },
    uniqueItem: {
      get: uniqueItem,
      set: setUniqueItem,
    },
    detailsItem: {
      get: detailsItem,
      set: setDetailsItem,
    },
    getLocal,
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
