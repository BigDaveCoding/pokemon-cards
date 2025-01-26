"use strict";

async function FetchPokeData(search) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    const data = await response.json()

    const pokemon_name = data.name
    const pokemon_default_img = data.sprites.front_default

    return {
        pokemon_name,
        pokemon_default_img
    }

}

export default FetchPokeData