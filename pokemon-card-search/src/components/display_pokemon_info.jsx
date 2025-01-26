import FetchPokeData from "../utilities/poke-api"

function DisplayPokemonInfo({data}) {

    return (
        <>
            <h3>pokemon name: {data.pokemon_name} </h3>
            <img src={data.pokemon_default_img} alt="" />
            <img src={data.pokemon_shiny_img} alt="" />
            <p>{data.pokemon_stats_hp[0]}: {data.pokemon_stats_hp[1]}</p>
        </>
    )
}

export default DisplayPokemonInfo