import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import foodFilter from '../services/fetchFilter';
import appContext from '../context/appContext';
import './SearchBar.css';

function SearchBar({ title }) {
  const [inputText, setInputText] = useState('');
  const [radioButton, setRadioButton] = useState('ingredient');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const { cardsList, uniqueItem } = useContext(appContext);
  const history = useHistory();

  useEffect(() => {
    const checkInput = () => {
      if (inputText) return setBtnDisabled(false);
      return setBtnDisabled(true);
    };
    checkInput();
  }, [inputText]);

  async function onClickFilter() {
    const resp = await foodFilter(inputText, radioButton, title);
    if (resp) {
      cardsList.set(resp);
    }
    if (resp) {
      if (resp.length === 1 && title === 'Foods') {
        uniqueItem.set(resp[0]);
        const id = resp[0].idMeal;
        history.push(`/foods/${id}`);
      }
      if (resp.length === 1 && title === 'Drinks') {
        uniqueItem.set(resp[0]);
        const id = resp[0].idDrink;
        history.push(`/drinks/${id}`);
      }
    }
  }
  return (
    <div className="searchbar-container">
      <label className="searchbar-label" htmlFor="busca">
        <input
          type="text"
          id="busca"
          value={ inputText }
          data-testid="search-input"
          onChange={ ({ target: { value } }) => setInputText(value) }
        />
        <button
          className="btn btn-search"
          type="button"
          data-testid="exec-search-btn"
          onClick={ onClickFilter }
          disabled={ btnDisabled }
        >
          Search
        </button>
      </label>
      <div className="btn-radios">
        <label htmlFor="ingredient">
          <input
            defaultChecked="checked"
            type="radio"
            id="ingredient"
            name="search-radio"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onClick={ ({ target: { value } }) => setRadioButton(value) }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            name="search-radio"
            value="name"
            data-testid="name-search-radio"
            onClick={ ({ target: { value } }) => setRadioButton(value) }
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            type="radio"
            id="first-letter"
            name="search-radio"
            value="first-letter"
            data-testid="first-letter-search-radio"
            onClick={ ({ target: { value } }) => setRadioButton(value) }
          />
          Primeira Letra
        </label>
      </div>
    </div>
  );
}

export default SearchBar;

SearchBar.propTypes = {
  title: PropTypes.string.isRequired,
};
