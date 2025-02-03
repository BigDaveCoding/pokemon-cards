import { useState } from 'react'
import './App.css'
import FetchPokeData from './utilities/poke-api'
import getPokemonTCGData from './utilities/pokemon-TCG-api'
import SearchBar from './components/search-bar'
import DisplayPokemonInfo from './components/display_pokemon_info'
import CreateText from './components/CreateText'
import Header from './components/Header'


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
      <div className="bg-slate-800">
        <div className="max-w-[768px] w-full m-auto bg-slate-800 text-slate-100">
          <Header />
          <SearchBar onSearch={handleData} onTcgSearch={handleTcgData} />
          {loadingPokeDate || loadingTcgData && <CreateText tag="p" className="text-center text-2xl" text="Loading Data..." />}
          {pokemonData && tcgPokemonData && !loadingPokeDate && !loadingTcgData && <DisplayPokemonInfo data={pokemonData} tcgData={tcgPokemonData} />}
        </div>
      </div>
    </>
  )
}

export default App
