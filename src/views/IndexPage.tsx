import {useMemo} from "react"
import {useAppStore} from "../stores/useAppStore"
import DrinkCard from "../components/DrinkCard"

export default function IndexPage() {
    const drinks = useAppStore((state) => state.drinks)
    console.log(drinks)
    
    const hasDrinks = useMemo(() => drinks.length, [drinks])

    return (
        <>
            <h1 className="text-6xl font-extrabold">Recetas</h1>
            {hasDrinks ? (
                <>
                    {drinks.map(drink => (
                        <DrinkCard
                            key={drink.idDrink}
                            drink={drink}
                        />
                    ))}
                </>
            ) : (
                <>
                    <p className="my-10 text-center text-2xl">No hay resultados aún, debes buscar las recetas primero.</p>
                </>
            )}
        </>
    )
}
