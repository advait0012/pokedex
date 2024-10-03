import data from "./data.json"
import {Pokemon} from "./components/PokemonCard"

// data.forEach(Pokemon)

function renderPokemon(list){
  list.forEach((pokemonObj)=>{
    Pokemon(pokemonObj)
  })
}

renderPokemon(data);



