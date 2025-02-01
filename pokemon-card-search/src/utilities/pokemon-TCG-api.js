

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
    const flavor_text = first_card.flavorText

    console.log("first card", first_card)
    console.log(flavor_text)
    
    return {
        data,
        first_card,
        flavor_text
        
    }
}

// getPokemonTCGData("charizard")

export default getPokemonTCGData