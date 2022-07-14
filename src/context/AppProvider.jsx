import React, { useState } from 'react';
import PropTypes from 'prop-types';
import appContext from './appContext';

const INITIAL_STATE_USER = {
  email: '',
  senha: '',
};

function AppProvider({ children }) {
  const [user, setUser] = useState(INITIAL_STATE_USER);
  const [load, setLoad] = useState(false);
  const appData = {
    user: {
      get: user,
      set: setUser,
    },
    load: {
      get: load,
      set: setLoad,
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
