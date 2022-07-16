import fetchByAllFoods from './fetchRequest';

function caseIngredient(inputText, title) {
  if (title === 'Foods') return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputText}`;
  return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputText}`;
}

function caseName(inputText, title) {
  if (title === 'Foods') return `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
  return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputText}`;
}

function caseFirstLetter(inputText, title) {
  if (title === 'Foods') return `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputText}`;
  return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputText}`;
}

async function toggleFilter(inputText, radioButton, title) {
  let URL;
  if (inputText.length > 0) {
    switch (radioButton) {
    case 'ingredient':
      URL = caseIngredient(inputText, title);
      break;
    case 'name':
      URL = caseName(inputText, title);
      break;
    case 'first-letter': {
      if (inputText.length > 1) {
        global.alert('Your search must have only 1 (one) character');
        return;
      }
      URL = caseFirstLetter(inputText, title);
      break;
    }
    default:
      return;
    }
  }
  const resp = await fetchByAllFoods(URL, title);
  return resp;
}

export default toggleFilter;
