import {z} from 'zod'
import {CategoriesAPIResponseSchema, DrinkAPIResponse, RecipeAPIResponseSchema, searchFilterSchema} from '../utils/recipes-schema'

export type Categories = z.infer<typeof CategoriesAPIResponseSchema>
export type searchFilter = z.infer<typeof searchFilterSchema>
export type Drink = z.infer<typeof DrinkAPIResponse>
export type Drinks = Array<Drink>
export type Recipe = z.infer<typeof RecipeAPIResponseSchema>


