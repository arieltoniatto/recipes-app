const requestById = async (pag, id) => {
  let URL = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  let TYPE_REQUEST = 'meals';
  if (pag.includes('/drinks')) {
    URL = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
    TYPE_REQUEST = 'drinks';
  }
  const request = await fetch(URL).then((response) => response.json());
  return request[TYPE_REQUEST];
};

export default requestById;
