import {create} from "zustand"
import {devtools} from "zustand/middleware"
import {createRecipesSlice, RecipesSliceType} from "./recipeSlice"
import {FavoriteSliceType, createFavoritesSlice} from "./favoritesSlice"
import {createNotificationSlice, NotificacionSliceType} from "./notificationSlice"

export const useAppStore = create<RecipesSliceType & FavoriteSliceType & NotificacionSliceType>()(devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlice(...a),
    ...createNotificationSlice(...a)
})))
