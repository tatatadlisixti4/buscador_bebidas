import {z} from 'zod'
import {CategoriesAPIResponseSchema, DrinkAPIResponse, DrinksAPIResponse, searchFilterSchema} from '../utils/recipes-schema'

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type searchFilter = z.infer<typeof searchFilterSchema>
export type Drink = z.infer<typeof DrinkAPIResponse>
export type Drinks = z.infer<typeof DrinksAPIResponse>


