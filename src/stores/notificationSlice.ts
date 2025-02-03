import {StateCreator} from "zustand"
import {FavoriteSliceType} from "./favoritesSlice"

type Notification = {
    text: string
    error: boolean
    show: boolean
}

export type NotificacionSliceType = {
    notification: Notification
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void
}

export const createNotificationSlice : StateCreator<NotificacionSliceType & FavoriteSliceType, [], [], NotificacionSliceType> = (set) => ({
    notification: {
        text: '',
        error: false,
        show: false 
    },
    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
    }
})