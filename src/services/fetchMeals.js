const fetchByAllFoods = async (URL) => {
  const request = await fetch(URL)
    .then((response) => response.json());

  return request;
};

export default fetchByAllFoods;

// const fetchByNationality = async () => {
//   const ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
//   const request = await fetch(ENDPOINT);
//   const requestJson = await request.json();
//   return requestJson;
// };

// const fetchByIngredients = async (ingrediente) => {
//   const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
//   const request = await fetch(ENDPOINT);
//   const requestJson = await request.json();
//   return requestJson;
// };

// const fetchByName = async (nome) => {
//   const ENDPOINT = `https://www.themealdb.com/api/json/v1/1/search.php?s=${nome}`;
//   const request = await fetch(ENDPOINT);
//   const requestJson = await request.json();
//   return requestJson;
// };

// const fetchByFirstLetter = async (letter) => {
//   const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`);
//   const requestJson = await request.json();
//   return requestJson;
// };

// const fetchImage = async (ingredientName) => {
//   const request = await fetch(`https://www.themealdb.com/images/ingredients/${ingredientName}-Small.png`);
//   return request;
// };

// export {
//   fetchByAllFoods,
//   fetchByNationality,
//   fetchByIngredients,
//   fetchByName,
//   fetchByFirstLetter,
//   fetchImage,
// };
