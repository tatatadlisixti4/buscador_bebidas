import axios from 'axios'
import {CategoriesAPIResponseSchema, DrinksAPIResponse, RecipeAPIResponseSchema} from '../utils/recipes-schema'
import {Drink, Drinks, searchFilter} from '../types'
import translateToEnglish from './Translate'

export async function getCategories() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const {data} = await axios(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if(result.success) return result.data
    return {drinks: []}
}

export async function getRecipes(filters: searchFilter) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}`
    // Se traduce input español al ingles
    // TODO: validar idioma para traducir o no
    const word = await translateToEnglish(filters.ingredient)
    const url2 = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${word}`
    const {data: categoryList} = await axios(url)
    const {data: ingredientsList} = await axios(url2)

    const response = DrinksAPIResponse.safeParse(categoryList)
    const response2 = DrinksAPIResponse.safeParse(ingredientsList)

    if(response.success && response2.success) {
        const filteredDrinks : Drinks = categoryList.drinks.filter((drinkByCategory : Drink) => {
            return ingredientsList.drinks.some((drinkByIngredient : Drink) => drinkByIngredient.idDrink === drinkByCategory.idDrink)
        })
        return filteredDrinks
    }
    return []
}

export async function getRecipeById(id: Drink['idDrink']) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
    const {data} = await axios(url)
    const result = RecipeAPIResponseSchema.safeParse(data.drinks[0])
    if(result.success) return result.data
}
