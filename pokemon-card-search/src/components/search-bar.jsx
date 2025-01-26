import FetchPokeData from '../utilities/poke-api';

function SearchBar() {

    const handleSearch = (e) => {
        //prevent submit form from refreshing the page
        e.preventDefault()
        // Get <input> tag containing user search
        const element = document.querySelector('#pokemon_name')
        console.log(element)
        // Take value from the element
        const pokemon_name = element.value
        console.log(pokemon_name)
        // Run FetchPokeData using pokemon_name value.
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