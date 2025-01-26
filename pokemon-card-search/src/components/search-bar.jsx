import FetchPokeData from '../utilities/poke-api';

function SearchBar() {

    const handleSearch = (e) => {
        e.preventDefault()
        const element = document.querySelector('#pokemon_name')
        console.log(element)
        const pokemon_name = element.value
        console.log(pokemon_name)
        FetchPokeData(pokemon_name)
        
    }


    return (
        <>
            <form>
                <label htmlFor="pokemon_name">Search</label>
                <input onChange={(e) => console.log(e.target.value)} type="text" id="pokemon_name" name="pokemon_name" placeholder="search for a pokemon"></input>

                <input onClick={(e) => handleSearch(e)} type="submit" value="Search" className="border-2 border-green-950 p-1 bg-amber-200" ></input>
            </form>
        </>
    )
}

export default SearchBar