import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <div>
      <Header
        title="Favorite Recipes"
        perfil
        pesquisa={ false }
      />
      {/* <h1>HOME FavoriteRecipes</h1> */}
    </div>
  );
}

export default FavoriteRecipes;
