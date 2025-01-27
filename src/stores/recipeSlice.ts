import {StateCreator} from "zustand"

type Category = object

export type RecipesSliceType = {
    categories: Category[]  
}

export const createRecipesSlice : StateCreator<RecipesSliceType>= () => ({
    categories: []
})
