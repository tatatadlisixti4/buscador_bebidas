import {StateCreator} from "zustand"

type Notification = {
    text: string
    error: boolean
    show: boolean
}

export type NotificacionSliceType = {
    notification: Notification
}

export const createNotificationSlice : StateCreator<NotificacionSliceType> = (set, get) => ({
    notification: {
        text: 'Texto Notificación',
        error: false,
        show: true 
    }
})