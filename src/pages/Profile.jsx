import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Profile.css';

function Profile() {
  const history = useHistory();

  function logout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header
        title="Profile"
        perfil
        pesquisa={ false }
      />
      <h1>Profile page</h1>
      <h3 data-testid="profile-email">
        {JSON.parse(localStorage.getItem('user')) && (
          JSON.parse(localStorage.getItem('user')).email)}
      </h3>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logout }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
