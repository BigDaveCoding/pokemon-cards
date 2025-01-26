"use strict";

function FetchPokeData(search) {
    fetch('https://pokeapi.co/api/v2/pokemon/ivysaur')
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })

}

export default FetchPokeData