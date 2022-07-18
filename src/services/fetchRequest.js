const fetchByAllFoods = async (URL, title) => {
  const QTD_MAX = 12;
  let request = await fetch(URL)
    .then((response) => response.json());

  if (!request.meals && !request.drinks) {
    global.alert('Sorry, we haven\'t found any recipes for these filters.');
    return null;
  }
  if (title === 'Foods') {
    request = request.meals.filter((_element, index) => index < QTD_MAX);
  }
  if (title === 'Drinks') {
    request = request.drinks.filter((_element, index) => index < QTD_MAX);
  }
  return request;
};

export default fetchByAllFoods;
