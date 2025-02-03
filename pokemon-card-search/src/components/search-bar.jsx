import { useState } from 'react'
import FetchPokeData from '../utilities/poke-api';
import InputText from './inputs/InputText';
import InputSubmit from './inputs/InputSubmit';

function SearchBar({ onSearch, onTcgSearch }) {

    const [pokemonName, setPokemonName] = useState('');

    const handleSearch = (e) => {
        //prevent submit form from refreshing the page
        e.preventDefault()
        // Run function passed from parent using variable pokemonName
        onSearch(pokemonName)
        onTcgSearch(pokemonName)
          
    }

    return (
        <>
            <form className="flex flex-col" onSubmit={handleSearch}>
                <InputText onChange={(e) => setPokemonName(e.target.value)} className="border-2 p-2 m-2 rounded-lg" id="test_id" placeholder="test placeholder" />
                <InputSubmit className="border-2 p-2 m-2 rounded-lg bg-amber-500" value="Search" />
            </form>
        </>
    )
}

export default SearchBar