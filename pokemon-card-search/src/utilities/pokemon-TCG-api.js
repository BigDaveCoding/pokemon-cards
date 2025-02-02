import FetchPokeData from "./poke-api"

async function getPokemonTCGData(query) {
    const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${query}`)
    const data = await response.json()

    console.log("arguemnt into tcg data:", query)

    const all_cards = data.data
    const sorted_cards = all_cards.sort((cardA, cardB) => {
        const dateA = cardA.set.releaseDate ? new Date(cardA.set.releaseDate) : new Date(0); 
        const dateB = cardB.set.releaseDate ? new Date(cardB.set.releaseDate) : new Date(0);  
  
        return dateA - dateB;
    })

    const first_card = sorted_cards[0]
    let flavor_text = ""

    let evolves_to = ""
    let evolves_to_array = []
    let evolves_to_img = []

    console.log(first_card.evolvesTo)
    console.log(first_card.evolvesFrom)
    console.log("first card name = ", first_card.name.split(' ')[0])

    for (const card of sorted_cards) {
        // console.log(card.flavorText)
        if (card.flavorText === undefined) {
            // console.log("empty flavor text")
        } else {
            // console.log("flovor text exists")
            flavor_text = card.flavorText
            break;
        }
    }


    if (first_card.evolvesTo === undefined) {
        console.log('evolve to is undefined')
        if (first_card.evolvesFrom){
            console.log("pokemon is final evolution and evolves from... THIS ONE")
            evolves_to_array.push(first_card.evolvesFrom)
            evolves_to_array.push(query)

            evolves_to_array.unshift(await getEvolutionFromFrom(evolves_to_array[0])) 
            

        } else {
            evolves_to_array.push(query)
        }
    } // multiple evolutions like eevee
    else if (first_card.evolvesTo && first_card.evolvesTo.length > 1) {
        console.log("pokemon has multiple evolutions")
        evolves_to_array.push(query)
        first_card.evolvesTo.forEach(evolution => {
            evolves_to_array.push(evolution)
        })
    } // middle evolution
    else if (first_card.evolvesTo && first_card.evolvesFrom) {
        console.log("middleEvolution")
        evolves_to_array.push(first_card.evolvesFrom)
        evolves_to_array.push(query)
        evolves_to_array.push(first_card.evolvesTo[0])
    } //first evolution
    else if (!first_card.evolvesFrom && first_card.evolvesTo) {
        console.log("pokemon is first evolution and evolves into something")
        evolves_to_array.push(query)
        evolves_to_array.push(first_card.evolvesTo[0])

        console.log("pokemon name for data:", evolves_to_array[1])

        evolves_to_array.push( await getEvolutionEvolution(evolves_to_array[1]))


    }

    console.log("evolves to array:", evolves_to_array)
    evolves_to_array = evolves_to_array.filter(item => item !== null)
    console.log("filtered array:", evolves_to_array)
    
    const evolves_to_img_promises = evolves_to_array.map(pokemon => getPokemonSprites(pokemon));
    evolves_to_img = await Promise.all(evolves_to_img_promises);

    console.log("image array",evolves_to_img)
    

    
    return {
        data,
        first_card,
        flavor_text,
        evolves_to,
        evolves_to_img
        
        
    }
}

async function getPokemonSprites(pokemon_name) {

    if (pokemon_name === null) {
        return null
    }
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`)
    const data = await response.json()


    console.log(data.sprites.front_default)
    return data.sprites.front_default

}

async function getEvolutionEvolution(pokemon_name) {

    const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${pokemon_name}`)
    const data = await response.json()

    console.log("evolution evolution data:", data)
    // console.log(data.data[0].evolvesTo[0])

    if (!data.data[0].evolvesTo) {
        return null
    }

    return data.data[0].evolvesTo[0]
}

async function getEvolutionFromFrom(pokemon_name) {

    const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${pokemon_name}`)
    const data = await response.json()

    console.log("evolution evolution data:", data)
    // console.log(data.data[0].evolvesTo[0])

    if (!data.data[0].evolvesFrom) {
        return null
    }

    return data.data[0].evolvesFrom

}

// getPokemonTCGData("charizard")

export default getPokemonTCGData