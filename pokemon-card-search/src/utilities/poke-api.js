"use strict";

async function FetchPokeData(search) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    const data = await response.json()

    console.log(data)

    const pokemon_name = data.name
    const pokemon_default_img = data.sprites.other["official-artwork"].front_default
    const pokemon_shiny_img = data.sprites.other["official-artwork"].front_shiny
    const pokemon_stats = {}

    const pokemon_abilities = data.abilities
    const ability_description = {}

    for (const ability of pokemon_abilities) {
        // console.log(ability);
        // console.log(ability.ability.name);
        // console.log(ability.ability.url);

        const abilityResponse = await fetch(ability.ability.url);
        const abilityData = await abilityResponse.json();

        // console.log(abilityData);  // Log the ability data

        ability_description[ability.ability.name] = abilityData.effect_entries["1"].effect
    }

    // console.log(`abilities: ${pokemon_abilities}`)
    console.log(ability_description)

    data.stats.forEach(stat => {
        pokemon_stats[stat.stat.name] = stat.base_stat
    });
    // console.log(pokemon_stats)

    return {
        pokemon_name,
        pokemon_default_img,
        pokemon_shiny_img,
        pokemon_stats,
        ability_description
    }

}

export default FetchPokeData