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
    <header>
      {perfil && (
        <input
          className="profile-icon"
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
      {pesquisa && (
        <div>
          <input
            className="search-icon"
            onClick={ () => setInputState((prev) => !prev) }
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search icon"
            type="image"
          />
        </div>
      )}
      {inputState && (
        <SearchBar title={ title } />
      )}
    </header>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  perfil: PropTypes.bool.isRequired,
  pesquisa: PropTypes.bool.isRequired,
};
