import FetchPokeData from "../utilities/poke-api"

function DisplayPokemonInfo({data}) {

    return (
        <>
            <h3>pokemon name: {data.pokemon_name} </h3>
            <img src="" alt="" />
        </>
    )
}

export default DisplayPokemonInfo