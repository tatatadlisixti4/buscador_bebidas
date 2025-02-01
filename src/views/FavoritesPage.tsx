import {useAppStore} from "../stores/useAppStore"

export default function FavoritesPage() {
    useAppStore((state) => state.categories)
    return (
        <>
            <h1>Favoritos</h1>
        </>
    )
}
