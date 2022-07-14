import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title }) {
  return (
    <div>
      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
      <object
        type="image/svg+xml"
        data={ profileIcon }
        data-testid="profile-top-btn"
      >
        Profile Icon
      </object>
      <object
        type="image/svg+xml"
        data={ searchIcon }
        data-testid="search-top-btn"
      >
        profileIco
      </object>
    </div>
  );
}

export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
