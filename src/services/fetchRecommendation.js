async function fetchRecommendation(pag) {
  let URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  let TYPE_REQUEST = 'drinks';
  const MAX_LENGTH_LIST = 6;
  if (pag.includes('/drinks')) {
    URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    TYPE_REQUEST = 'meals';
  }

  const request = await fetch(URL).then((response) => response.json());
  return request[TYPE_REQUEST].slice(0, MAX_LENGTH_LIST);
}

export default fetchRecommendation;
