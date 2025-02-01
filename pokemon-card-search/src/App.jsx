import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FetchPokeData from './utilities/poke-api'
import getPokemonTCGData from './utilities/pokemon-TCG-api'
import SearchBar from './components/search-bar'
import DisplayPokemonInfo from './components/display_pokemon_info'

function App() {

  const [pokemonData, setPokemonData] = useState(null)

  const handleData = async (search_name) => {
    const data = await FetchPokeData(search_name)
    setPokemonData(data)
    console.log("poke api data: ", data)
    }

  const [tcgPokemonData, setTcgPokemonData] = useState(null)

  const handleTcgData = async (search_name) => {
    const data = await getPokemonTCGData(search_name)
    console.log("tcgApiData: ", data)
    setTcgPokemonData(data)
    
  }

  return (
    <>
      {/* <h1 className="text-5xl text-red-700">hello is this working?</h1> */}
      <div className="">
        <SearchBar onSearch={handleData} onTcgSearch={handleTcgData} />
        {pokemonData && <DisplayPokemonInfo data={pokemonData} />}
      </div>
    </>
  )
}

export default App
