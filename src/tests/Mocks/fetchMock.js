import oneMeal from './data/oneMeal'
import oneDrink from "./data/oneDrink";
import drinkCategories from './data/drinkCategories'
import mealCategories from './data/mealCategories'
import drinks from './data/drinks'
import otherDrinks from './data/otherDrinks';
import newMeals from './data/newMeals'
import meals from './data/meals'
import { mealsCateg, drinksCateg } from './data/newCategories';
import drinksByIngredient from './data/drinksByIngredient'
import mealsByIngredient from './data/mealsByIngredient'

  const gigaMock = (type, param = '') => {
    jest.spyOn(global, 'fetch')
    .mockImplementation((endPoint) => Promise.resolve({
      json: async () => {
        if (endPoint === `https://www.${type}db.com/api/json/v1/1/lookup.php?i=${param}`) return  type === 'themeal' ? oneMeal : oneDrink //id
        if (endPoint === 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=') return otherDrinks //recommendations
        if (endPoint === 'https://www.themealdb.com/api/json/v1/1/search.php?s=') return newMeals //recommendations
        if (endPoint === `https://www.${type}db.com/api/json/v1/1/list.php?c=list`) return type === 'themeal' ? mealsCateg : drinksCateg //category btn
        if (endPoint === `https://www.${type}db.com/api/json/v1/1/filter.php?c=${param}`) return type === 'themeal' ? mealCategories : drinkCategories //category itemList
        if (endPoint === `https://www.${type}db.com/api/json/v1/1/filter.php?i=${param}`) return type === 'themeal' ? mealsByIngredient : drinksByIngredient //filter ingredient
        if (endPoint === `https://www.${type}db.com/api/json/v1/1/search.php?s=${param}`) return type === 'themeal' ? meals : drinks //filter name
        if (endPoint === `https://www.${type}db.com/api/json/v1/1/search.php?f=${param}`) return type === 'themeal' ? meals : drinks //filter firstLetter
      }
    }))
  }

  export default gigaMock;