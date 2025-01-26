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
            <form onSubmit={handleSearch}>
                <label htmlFor="pokemon_name">Search</label>
                <input onChange={(e) => setPokemonName(e.target.value)} type="text" id="pokemon_name" name="pokemon_name" placeholder="search for a pokemon"></input>

                <input type="submit" value="Search" className="border-2 border-green-950 p-1 bg-amber-200" ></input>
            </form>
        </>
    )
}

export default SearchBar