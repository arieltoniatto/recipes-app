import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  return (
    <div>
      <Header
        title="Done Recipes"
        perfil
        pesquisa={ false }
      />
      {/* <h1>Done Recipes</h1> */}
    </div>
  );
}

export default DoneRecipes;
