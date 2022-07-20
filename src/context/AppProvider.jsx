import React, { useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './appContext';

const INITIAL_STATE_USER = {
  email: '',
  senha: '',
};

function AppProvider({ children }) {
  const [user, setUser] = useState(INITIAL_STATE_USER);
  const [cardsList, setCardList] = useState([]);
  const [detailsItem, setDetailsItem] = useState(null);
  const [uniqueItem, setUniqueItem] = useState({});

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
