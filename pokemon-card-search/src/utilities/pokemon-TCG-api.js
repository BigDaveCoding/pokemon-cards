import FetchPokeData from "./poke-api"

async function getPokemonTCGData(query) {
    const response = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${query}`)
    const data = await response.json()

    const all_cards = data.data
    const sorted_cards = all_cards.sort((cardA, cardB) => {
        const dateA = cardA.set.releaseDate ? new Date(cardA.set.releaseDate) : new Date(0); 
        const dateB = cardB.set.releaseDate ? new Date(cardB.set.releaseDate) : new Date(0);  
  
        return dateA - dateB;
    })

    const first_card = sorted_cards[0]
    let flavor_text = ""

    let evolves_to = ""
    let evolves_to_array = [first_card.name]
    let evolves_to_img = []

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


    if (!first_card.evolvesTo) {
        console.log("This card does not evolve to anything.");
      } else {

        // console.log("This card evolves to:", first_card.evolvesTo);
        evolves_to_array.push(first_card.evolvesTo[0])

        const evolve = first_card.evolvesTo
        // console.log("length:", evolve.length)

        if (evolve.length <= 1) {

            const fetchEvolveResponse = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${evolve}`)
            const evolveData = await fetchEvolveResponse.json()
            // console.log("evolve data:", evolveData)

            if (!evolveData.data[0].evolvesTo ){

                // console.log("evolution is final evolution")

            } else {

                // console.log("evolution has an evolution")

                const evoEvoResponse = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:${evolveData.data[0].evolvesTo[0]}`)
                const evoEvoData = await evoEvoResponse.json()

                // console.log("evolution of evolution data:", evoEvoData)
                evolves_to_array.push(evolveData.data[0].evolvesTo[0])
            }
        } else {

            console.log("evolution list longer than 1")
        }
        

      }

    console.log("evolves to array:", evolves_to_array)

    
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
    
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_name}`)
    const data = await response.json()

    console.log(data.sprites.front_default)
    return data.sprites.front_default

}

// getPokemonTCGData("charizard")

export default getPokemonTCGData