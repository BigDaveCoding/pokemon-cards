"use strict";

async function FetchPokeData(search) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${search}`);
    const data = await response.json()

    console.log(data)

    const pokemon_name = data.name
    const pokemon_default_img = data.sprites.other["official-artwork"].front_default
    const pokemon_shiny_img = data.sprites.other["official-artwork"].front_shiny
    const pokemon_stats = {}

    const pokemon_types = data.types
    const type_img_array = []

    console.log(pokemon_types)

    for (const type of pokemon_types) {

        const typeResponse = await fetch(type.type.url)
        const typeData = await typeResponse.json()

        type_img_array.push(typeData.sprites["generation-viii"]["brilliant-diamond-and-shining-pearl"].name_icon)
        
    }

    const pokemon_abilities = data.abilities
    const ability_description = {}

    for (const ability of pokemon_abilities) {
        const abilityResponse = await fetch(ability.ability.url);
        const abilityData = await abilityResponse.json();

        console.log("ability data:", abilityData)

        try{
            ability_description[ability.ability.name] = abilityData.effect_entries["1"].effect
        } catch(err){
            console.error("problem getting ability info")
            ability_description["error"] = "problem getting ability info"
        }

    }

    console.log(ability_description)

    data.stats.forEach(stat => {
        pokemon_stats[stat.stat.name] = stat.base_stat
    });

    return {
        pokemon_name,
        pokemon_default_img,
        pokemon_shiny_img,
        pokemon_stats,
        ability_description,
        type_img_array
    }

}

export default FetchPokeData