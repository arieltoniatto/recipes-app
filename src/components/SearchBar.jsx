import React from 'react';

function SearchBar() {
  return (
    <div data-testid="search-input">
      <label htmlFor="busca">
        <input
          type="text"
          id="busca"
          data-testid="search-input"
        />
      </label>
      <div>
        <label htmlFor="ingredient">
          Ingredient:
          <input
            type="radio"
            id="ingredient"
            name="search-radio"
            data-testid="ingredient-search-radio"
          />
        </label>
        <label htmlFor="name">
          Name:
          <input
            type="radio"
            id="name"
            name="search-radio"
            data-testid="name-search-radio"
          />
        </label>
        <label htmlFor="first-letter">
          Primeira Letra:
          <input
            type="radio"
            id="first-letter"
            name="search-radio"
            data-testid="first-letter-search-radio"
          />
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
