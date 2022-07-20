import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import appContext from './appContext';

const INITIAL_STATE_USER = {
  email: '',
  senha: '',
};

const INITIAL_STATE_IN_PROGRESS_R = {
  cocktails: {},
  meals: {},
};

function AppProvider({ children }) {
  const [user, setUser] = useState(INITIAL_STATE_USER);
  const [cardsList, setCardList] = useState([]);
  const [detailsItem, setDetailsItem] = useState(null);
  const [uniqueItem, setUniqueItem] = useState({});
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [inProgressRecipes, setInProfressRecipes] = useState(INITIAL_STATE_IN_PROGRESS_R);

  function getLocal(params) {
    const localStore = localStorage.getItem(params);
    if (localStore) {
      return JSON.parse(localStore);
    }
    return null;
  }

  useEffect(() => {
    const doneRecipesLocal = localStorage.getItem('doneRecipes');
    if (doneRecipesLocal) return setDoneRecipes(JSON.parse(doneRecipesLocal));

    const favoriteRecipesLocal = localStorage.getItem('favoriteRecipes');
    if (favoriteRecipesLocal) return setFavoriteRecipes(JSON.parse(favoriteRecipesLocal));

    const inProgressRecipesLocal = localStorage.getItem('inProgressRecipes');
    if (inProgressRecipesLocal) {
      return setInProfressRecipes(JSON.parse(inProgressRecipesLocal));
    }
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
    uniqueItem: {
      get: uniqueItem,
      set: setUniqueItem,
    },
    doneRecipes: {
      get: doneRecipes,
      set: setDoneRecipes,
    },
    favoriteRecipes: {
      get: favoriteRecipes,
      set: setFavoriteRecipes,
    },
    inProgressRecipes: {
      get: inProgressRecipes,
      set: setInProfressRecipes,
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
