import {StateCreator} from "zustand"
import {Recipe} from "../types"

export type FavoriteSliceType = {
    favorites: Recipe[]
}

export const createFavoritesSlice : StateCreator<FavoriteSliceType> = (set) => ({
    favorites: []
})