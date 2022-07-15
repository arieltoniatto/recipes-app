import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import './Header.css';

function Header({ title, perfil, pesquisa }) {
  const [inputState, setInputState] = useState(false);

  const history = useHistory();

  return (
    <div className="header">
      <header>
        {perfil && (
          <input
            src={ profileIcon }
            alt="profile icon"
            type="image"
            data-testid="profile-top-btn"
            onClick={ () => history.push('/profile') }
            id="pro"
          />
        )}
        <h1
          data-testid="page-title"
        >
          {title}
        </h1>
        {inputState && (
          <SearchBar />
        )}
        {pesquisa && (
          <div>
            <input
              onClick={ () => setInputState((prev) => !prev) }
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="search icon"
              type="image"
            />
          </div>
        )}
      </header>
    </div>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  perfil: PropTypes.bool.isRequired,
  pesquisa: PropTypes.bool.isRequired,
};
