import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, perfil, pesquisa }) {
  // const [textBusca, setTextBusca] = useState('');
  // const [inputState, setInputState] = useState(false);

  return (
    <div>
      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
      {perfil && (
        <Link to="/profile">
          <object
            type="image/svg+xml"
            data={ profileIcon }
            data-testid="profile-top-btn"
            id="pro"
          >
            Profile Icon
          </object>
        </Link>
      )}
      {pesquisa && (
        <div>
          {/* {inputState && (
            <label htmlFor="busca">
              <input
                type="text"
                value={ textBusca }
                id="busca"
                onChange={ ({ target: { value } }) => setTextBusca(value) }
              />
            </label>
          )} */}
          <button
            type="button"
            // onClick={ () => setInputState(!inputState) }
          >
            <object
              type="image/svg+xml"
              data={ searchIcon }
              data-testid="search-top-btn"
            >
              profileIco
            </object>
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  perfil: PropTypes.bool.isRequired,
  pesquisa: PropTypes.bool.isRequired,
};
