import {useEffect, useMemo, useState} from 'react'
import {NavLink, useLocation} from 'react-router-dom'
import {useAppStore} from '../stores/useAppStore'

export default function Header() {
    const [searchFilters, setSearchFilters] = useState({
        ingredient: '',
        category: ''
    })

    const {pathname} = useLocation()
    const isHome = useMemo(() => pathname === '/',  [pathname])

    const fetchCategories = useAppStore(state => state.fetchCategories)
    const categories = useAppStore(state => state.categories)
    const searchRecipes = useAppStore(state => state.searchRecipes)
    
    useEffect(() =>{
        fetchCategories()
    }, [])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        setSearchFilters({
            ...searchFilters,
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        // TODO: Validar
        if(Object.values(searchFilters).includes('')) {
            console.log("hola")
            return
        }
        searchRecipes(searchFilters)
    }

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-sky-300'}>
            <div className="mx-auto container px-5 py-16">
                <div className="flex justify-between items-center">
                    <div className='flex items-center gap-10'>
                        <img className="w-32" src="/logo2.svg" alt="Logotipo" />
                        <h2 className='text-8xl font-bold uppercase border-2 p-2 border-slate-800 bg-rose-200'>Moe's</h2>
                    </div>

                    <nav className={isHome ? 'flex gap-4 p-3 border-[2px] bg-slate-600': 'flex gap-4 p-3 border-[2px] bg-rose-200'}>
                        <NavLink
                            to="/"
                            className={({isActive}) => isActive ?  'text-orange-700 uppercase font-bold' : isHome ? 'text-white uppercase font-bold': 'text-black uppercase font-bold'}
                        >Inicio</NavLink>
                        <NavLink
                            to="/favoritos"
                            className={({isActive})  => isActive ?  'text-orange-700 uppercase font-bold' : isHome ? 'text-white uppercase font-bold': 'text-black uppercase font-bold'}
                        >Favoritos</NavLink>
                    </nav>
                </div>

                {isHome && (
                    <form 
                        className='md:w-1/2 2xl:w-1/3 border-[2px] bg-slate-600 my-32 p-10 shadow space-y-6'
                        onSubmit={handleSubmit}
                    >
                        <div className='space-y-4'>
                            <label 
                                htmlFor="ingredient"
                                className='block text-white uppercase font-extrabold text-lg'
                            >Nombre o Ingredientes</label>

                            <input 
                                id='ingredient'
                                name='ingredient'
                                type="text"
                                placeholder='Nombre o Ingrediente. Ej. Vodka, Tequila, Café'
                                className='p-3 w-full rounded-lg focus:outline-none'
                                onChange={handleChange}
                                value={searchFilters.ingredient}
                            />
                        </div>

                        <div className='space-y-4'>
                            <label 
                                htmlFor="category"
                                className='block text-white uppercase font-extrabold text-lg'
                            >Categoría </label>

                            <select 
                                id='category'
                                name='category'
                                className='p-3 w-full rounded-lg focus:outline-none' 
                                onChange={handleChange}
                                value={searchFilters.category}
                            >   
                                <option value="">-- Seleccione --</option>
                                {categories.drinks.map(category => (
                                    <option 
                                        key={category.strCategory}
                                        value ={category.strCategory}
                                    >{category.strCategory}</option>
                                ))}
                            </select>
                        </div>

                        <input 
                            type='submit' 
                            value='Buscar Recetas'
                            className='cursor-pointer bg-orange-800 hover:bg-orange-900 text-white font-extrabold w-full p-2 rounded-lg uppercase'
                        />
                    </form>
                )}
            </div>
        </header>
    )
}
