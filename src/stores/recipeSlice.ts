import {StateCreator} from "zustand"
import {getCategories} from "../services/RecipeService"
import {Categories, searchFilter} from "../types"

export type RecipesSliceType = {
    categories: Categories
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilter: searchFilter) => Promise<void>
}

export const createRecipesSlice : StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    fetchCategories: async () => {
        const categories = await getCategories()
        set({
            categories
        })
    },
    searchRecipes: async (filters) => {
        console.log(filters)
        
    }
})

