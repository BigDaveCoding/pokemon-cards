"use strict";

async function FetchPokeData(search) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    const data = await response.json()

    console.log(data)

    const pokemon_name = data.name
    const pokemon_default_img = data.sprites.front_default
    const pokemon_shiny_img = data.sprites.front_shiny
    const pokemon_stats_hp = [data.stats[0].stat.name, data.stats[0].base_stat]

    return {
        pokemon_name,
        pokemon_default_img,
        pokemon_shiny_img,
        pokemon_stats_hp
    }

}

export default FetchPokeData