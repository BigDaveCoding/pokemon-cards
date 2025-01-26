import fetchPokeData from '../utilities/poke-api';

function searchBar() {
    return (
        <>
            <form>
                <label for="pokemon_name">Search</label>
                <input id="pokemon_name" name="pokemon_name" placeholder="search for a pokemon"></input>
            </form>
        </>
    )
}

export default searchBar