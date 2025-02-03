"use strict";

async function FetchPokeData(search) {
    let response;
    let data;

    let new_search = ''

    if (search.includes(' ')) {
        new_search = search.replace(/ /g, '-')
    } else {
        new_search = search
    }

    try {
        response = await fetch(`https://pokeapi.co/api/v2/pokemon/${new_search}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        data = await response.json();
    } catch (err) {
        console.error("Error fetching Pokémon data:", err);
        return; // Exit early if the fetch fails
    }

    console.log(data)

    const pokemon_name = data.name
    const pokemon_default_img = data.sprites.other["official-artwork"].front_default
    const pokemon_shiny_img = data.sprites.other["official-artwork"].front_shiny
    const pokemon_stats = {}

    const pokemon_types = data.types
    const type_img_array = []

    // console.log(pokemon_types)

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

        // console.log("ability data:", abilityData)

        try{
            ability_description[ability.ability.name] = abilityData.effect_entries["1"].effect
        } catch(err){
            console.error("problem getting ability info")
        }

        try{
            const flavor_text_entries = abilityData.flavor_text_entries
            // console.log(flavor_text_entries)

            for(const entry of flavor_text_entries){
                // console.log(entry)

                if (entry.language.name == "en"){
                    // console.error(entry.flavor_text)
                    ability_description[ability.ability.name] = entry.flavor_text
                    break
                }

            }
        } catch(err){
            console.error(err)
        }

    }

    // console.log(ability_description)

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