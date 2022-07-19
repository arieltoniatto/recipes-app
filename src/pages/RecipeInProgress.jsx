import React from 'react';

function RecipeInProgress() {
  return (
    <div className="main-container">
      <div className="container">
        <img
          data-testid="recipe-photo"
          src="aaa"
          atl=""
        />
        <h1 data-testid="recipe-title">Recipe title</h1>
        <button type="button" data-testid="share-btn">Share</button>
        <button type="button" data-testid="favorite-btn">Favorite</button>
        <p data-testid="recipe-category">Categorie Text</p>
        <ul>
          <li data-testid={ `${index}-ingredient-step` }>ingredients</li>
        </ul>
        <p data-testid="instructions">Instructions</p>
        <button type="button" data-testid="finish-recipe-btn">Finish Recipe</button>
      </div>
    </div>
  );
}

export default RecipeInProgress;
