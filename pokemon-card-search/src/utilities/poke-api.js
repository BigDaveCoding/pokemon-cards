"use strict";

function FetchPokeData(search) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${search}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            const pokemon_name = data.name
            const pokemon_default_img = data.sprites.front_default
            console.log(pokemon_name)
            console.log(pokemon_default_img)
        })

}

export default FetchPokeData