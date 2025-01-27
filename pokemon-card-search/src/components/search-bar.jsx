import { useState } from 'react'
import FetchPokeData from '../utilities/poke-api';

function SearchBar({ onSearch }) {

    const [pokemonName, setPokemonName] = useState('');

    const handleSearch = (e) => {
        //prevent submit form from refreshing the page
        e.preventDefault()
        // Run function passed from parent using variable pokemonName
        onSearch(pokemonName)
          
    }

    return (
        <>
            <form className="flex flex-col" onSubmit={handleSearch}>
                <label htmlFor="pokemon_name"></label>
                <input className="border-2 p-2 m-2 rounded-lg" onChange={(e) => setPokemonName(e.target.value)} type="text" id="pokemon_name" name="pokemon_name" placeholder="search for a pokemon"></input>

                <input className="border-2 p-2 m-2 rounded-lg bg-amber-500" type="submit" value="Search" ></input>
            </form>
        </>
    )
}

export default SearchBar