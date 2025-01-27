"use strict";

async function FetchPokeData(search) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    const data = await response.json()

    console.log(data)

    const pokemon_name = data.name
    const pokemon_default_img = data.sprites.other["official-artwork"].front_default
    const pokemon_shiny_img = data.sprites.other["official-artwork"].front_shiny
    const pokemon_stats = {}

    data.stats.forEach(stat => {
        pokemon_stats[stat.stat.name] = stat.base_stat
    });
    console.log(pokemon_stats)

    return {
        pokemon_name,
        pokemon_default_img,
        pokemon_shiny_img,
        pokemon_stats
    }

}

export default FetchPokeData