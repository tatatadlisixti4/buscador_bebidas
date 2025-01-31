import axios from 'axios'
import {CategoriesAPIResponseSchema, DrinksAPIResponse} from '../utils/recipes-schema'
import {Drink, searchFilter} from '../types'

export async function getCategories() {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    const {data} = await axios(url)
    const result = CategoriesAPIResponseSchema.safeParse(data)
    if(result.success) return result.data
}

export async function getRecipes(filters: searchFilter) {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${filters.category}`
    const url2 = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${filters.ingredient}`
    const {data: categoryList} = await axios(url)
    const {data: ingredientsList} = await axios(url2)

    const response = DrinksAPIResponse.safeParse(categoryList)
    const response2 = DrinksAPIResponse.safeParse(ingredientsList)


    if(response.success && response2.success) {
        console.log('correcto')
        const filteredDrink = categoryList.drinks.filter((drinkByCategory : Drink) => {
            return ingredientsList.drinks.some((drinkByIngredient : Drink) => drinkByIngredient.idDrink === drinkByCategory.idDrink)
        })
        return filteredDrink
    } else {
        console.log('incorrecto')
        
    }
}