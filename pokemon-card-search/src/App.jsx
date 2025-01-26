import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/search-bar'
import DisplayPokemonInfo from './components/display_pokemon_info'

function App() {

  return (
    <>
      {/* <h1 className="text-5xl text-red-700">hello is this working?</h1> */}
      <SearchBar />
      <DisplayPokemonInfo />
    </>
  )
}

export default App
