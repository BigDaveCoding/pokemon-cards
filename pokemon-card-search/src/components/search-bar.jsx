import FetchPokeData from '../utilities/poke-api';

function SearchBar() {
    return (
        <>
            <form>
                <label htmlFor="pokemon_name">Search</label>
                <input id="pokemon_name" name="pokemon_name" placeholder="search for a pokemon"></input>
            </form>
        </>
    )
}

export default SearchBar