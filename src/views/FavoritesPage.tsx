import {useMemo} from "react"
import DrinkCard from "../components/DrinkCard"
import {useAppStore} from "../stores/useAppStore"

export default function FavoritesPage() {
    const favorites = useAppStore((state) => state.favorites)
    const hasFavorites = useMemo(() => favorites.length, [favorites])
    return (
        <>
            <h1 className="text-6xl font-extrabold mb-10 text-center md:text-left">Favoritos</h1>
            {hasFavorites ? (
                <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 my-1' gap-10 p-4 md:p-0">
                    {favorites.map(drink => (
                        <DrinkCard 
                            key={drink.idDrink}
                            drink={drink}
                        /> 
                    ))}
                </div>
            ) : (
                <p className="my-10 text-center text-2xl">
                    No tienes favoritos guardados, añádelos desde el inicio.
                </p>
            )}
            
        </>
    )
}
