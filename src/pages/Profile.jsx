import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Profile.css';
import profileIcon from '../images/profileIcon.svg';

function Profile() {
  const history = useHistory();

  function logout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="main-container-profile">
      <Header
        title="Profile"
        perfil
        pesquisa={ false }
      />
      <img src={ profileIcon } alt="profile-icon" />
      <h3 data-testid="profile-email">
        {JSON.parse(localStorage.getItem('user')) && (
          JSON.parse(localStorage.getItem('user')).email)}
      </h3>
      <div className="btn-container">
        <button
          className="btn"
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          className="btn"
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          className="btn"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
