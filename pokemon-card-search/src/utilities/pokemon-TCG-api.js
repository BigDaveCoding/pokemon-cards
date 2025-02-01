

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

    for (const card of sorted_cards) {
        console.log(card.flavorText)
        if (card.flavorText === undefined) {
            console.log("empty flavor text")
        } else {
            console.log("flovor text exists")
            flavor_text = card.flavorText
            break;
        }
    }
    

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