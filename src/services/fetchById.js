const requestById = async (id) => {
  const URL = `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const request = await fetch(URL).then((response) => response.json());
  return request;
};

export default requestById;
