const fetchByAllFoods = async (URL, title) => {
  const QTD_MAX = 12;
  let request = await fetch(URL)
    .then((response) => response.json());

  console.log(request.meals);
  console.log(request.drinks);

  console.log((Boolean(request.meals) && Boolean(request.drinks)));

  if (!request.meals && !request.drinks) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    return null;
  }
  if (title === 'Foods') request = request.meals.slice(0, QTD_MAX);
  if (title === 'Drinks') request = request.drinks.slice(0, QTD_MAX);
  return request;
};

export default fetchByAllFoods;
