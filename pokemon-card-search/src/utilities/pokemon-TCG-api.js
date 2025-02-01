

async function getPokemonTCGData(query) {
    const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${query}`)
    const data = await response.json()

    // console.log(data)
    return data
}

// getPokemonTCGData("charizard")

export default getPokemonTCGData