import React from 'react';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      <Header
        title="Profile"
        perfil
        pesquisa={ false }
      />
      <h1>Profile page</h1>
    </div>
  );
}

export default Profile;
