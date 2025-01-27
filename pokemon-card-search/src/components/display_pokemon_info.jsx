import FetchPokeData from "../utilities/poke-api"

function DisplayPokemonInfo({data}) {

    const unpackData = (object) => {
        return Object.entries(object).map(([key, value]) => (
            <div key={key}>
                <p>{key}:</p>
                <p>{value}</p>
            </div>
        ));
    }

    

    return (
        <>
            <h3>pokemon name: {data.pokemon_name} </h3>
            <img src={data.pokemon_default_img} alt="" />
            <img src={data.pokemon_shiny_img} alt="" />
            {unpackData(data.pokemon_stats)}
        </>
    )
}

export default DisplayPokemonInfo