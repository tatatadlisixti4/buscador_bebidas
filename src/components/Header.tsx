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
    const showNotification = useAppStore(state => state.showNotification)
    
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
        
        if(Object.values(searchFilters).includes('')) {
            showNotification({
                text: 'Todos los campos son obligatorios', 
                error: true
            })
            return
        }
        searchRecipes(searchFilters)
    }

    return (
        <header className={isHome ? 'bg-header bg-center bg-cover' : 'bg-sky-300'}>
            <div className="mx-auto container px-5 py-16">
                <div 
                    className="md:flex md:justify-between md:items-center grid grid-cols-1"
                >
                    <div className='order-2 md:order-1 md:flex items-center gap-10 space-y-10 md:space-y-0 '>
                        <img className="w-32 m-auto" src="/logo2.svg" alt="Logotipo" />
                        <h2 className='text-8xl font-bold uppercase border-[3px] p-2 border-slate-800 bg-rose-200 text-center md:text-left'>Moe's</h2>
                    </div>

                    <nav className={isHome ? 
                            'order-1 md:order-2 mb-20 md:mb-0 flex gap-4 p-3 border-[3px] bg-slate-600 justify-center' : 
                            'order-1 md:order-2 mb-[50px] md:mb-0 flex gap-4 p-3 border-[3px] border-slate-800 bg-rose-200 justify-center'}>
                        <NavLink
                            to="/"
                            className={({isActive}) => isActive ?  
                                'text-orange-700 uppercase font-bold' : 
                                isHome ? 
                                    'text-white uppercase font-bold' : 
                                    'text-black uppercase font-bold'}
                        >Inicio</NavLink>
                        <NavLink
                            to="/favoritos"
                            className={({isActive})  => isActive ?  
                                'text-orange-700 uppercase font-bold' : 
                                isHome ? 
                                    'text-white uppercase font-bold' : 
                                    'text-black uppercase font-bold'}
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
