function generateIngredient(detailsItem) {
  let listIngred = [];
  const MAX_QTD = 20;
  for (let i = 1; i <= MAX_QTD; i += 1) {
    const strIngredient = `strIngredient${i}`;
    const strMeasure = `strMeasure${i}`;
    if (detailsItem[strIngredient]) {
      listIngred = [
        ...listIngred,
        { strIngredient: detailsItem[strIngredient],
          strMeasure: detailsItem[strMeasure],
          checked: false }];
    }
  }
  return listIngred;
}

export default generateIngredient;
