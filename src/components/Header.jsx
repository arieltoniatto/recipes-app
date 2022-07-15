import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import './Header.css';

function Header({ title, perfil, pesquisa }) {
  const [inputState, setInputState] = useState(false);

  return (
    <div className="header">
      <header>
        {perfil && (
          <Link to="/profile">
            <img
              src={ profileIcon }
              alt="profile icon"
              type="image/svg+xml"
              data={ profileIcon }
              data-testid="profile-top-btn"
              id="pro"
            />

          </Link>
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
            <button
              type="button"
              onClick={ () => setInputState((prev) => !prev) }
              data-testid="search-btn"
            >
              <img
                src={ searchIcon }
                alt="search icon"
                type="image/svg+xml"
                data={ searchIcon }
                data-testid="search-top-btn"
              />
            </button>
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
