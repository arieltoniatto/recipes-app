const requestById = async (id) => {
  const URL = `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  console.log(URL);
  const request = await fetch(URL).then((response) => response.json());
  console.log(request);
  return request;
};

export default requestById;
