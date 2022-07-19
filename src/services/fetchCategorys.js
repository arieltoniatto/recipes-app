async function getCategory(pag) {
  const MAX_LENGTH_LIST = 5;
  let TYPE_REQUEST = 'meals';
  let URL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  if (pag === 'Drinks') {
    URL = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    TYPE_REQUEST = 'drinks';
  }
  const requestList = await fetch(URL)
    .then((response) => response.json())
    .then((lista) => lista[TYPE_REQUEST]
      .filter((_element, index) => index < MAX_LENGTH_LIST));

  return requestList;
}

async function getItemByCategory(category, pag) {
  const MAX_LENGTH_LIST = 12;
  let TYPE_REQUEST = 'meals';
  let URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  if (pag === 'Drinks') {
    URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`;
    TYPE_REQUEST = 'drinks';
  }
  const requestList = await fetch(URL)
    .then((response) => response.json())
    .then((lista) => lista[TYPE_REQUEST]
      .filter((_element, index) => index < MAX_LENGTH_LIST));
  return requestList;
}

export { getItemByCategory, getCategory };
