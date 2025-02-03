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
  const [loadingPokeDate, setLoadingPokeData] = useState(false)

  const handleData = async (search_name) => {
    setLoadingPokeData(true)
    const data = await FetchPokeData(search_name)
    setPokemonData(data)
    // console.log("poke api data: ", data)
    setLoadingPokeData(false)
    }

  const [tcgPokemonData, setTcgPokemonData] = useState(null)
  const [loadingTcgData, setLoadingTcgData] = useState(null)

  const handleTcgData = async (search_name) => {
    setLoadingTcgData(true)
    const data = await getPokemonTCGData(search_name)
    // console.log("tcgApiData: ", data)
    setTcgPokemonData(data)
    setLoadingTcgData(false)
  }

  return (
    <>
      {/* <h1 className="text-5xl text-red-700">hello is this working?</h1> */}
      <div className="">
        <SearchBar onSearch={handleData} onTcgSearch={handleTcgData} />

        {loadingPokeDate || loadingTcgData && <p className="text-2xl p-2 text-center">Loading Data...</p>}

        {pokemonData && tcgPokemonData && !loadingPokeDate && !loadingTcgData && <DisplayPokemonInfo data={pokemonData} tcgData={tcgPokemonData} />}
      </div>
    </>
  )
}

export default App
