import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {createRecipesSlice, RecipesSliceType} from "./recipeSlice"
import {FavoriteSliceType, createFavoritesSlice} from "../services/favoritesSlice"

export const useAppStore = create<RecipesSliceType & FavoriteSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a)
})))
