import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import FetchPokeData from './utilities/poke-api'
import SearchBar from './components/search-bar'
import DisplayPokemonInfo from './components/display_pokemon_info'

function App() {

  const [pokemonData, setPokemonData] = useState(null)

  const handleData = (search_name) => {
    setPokemonData(FetchPokeData(search_name))
    console.log(pokemonData)
  }

  return (
    <>
      {/* <h1 className="text-5xl text-red-700">hello is this working?</h1> */}
      <SearchBar />
      <DisplayPokemonInfo />
    </>
  )
}

export default App
