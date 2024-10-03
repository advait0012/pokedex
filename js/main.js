import data from "./data.json"
import {Pokemon} from "./components/PokemonCard"
import arrayShuffle from 'array-shuffle';

function renderPokemon(list){
  list.forEach((pokemonObj)=>{
    Pokemon(pokemonObj)
  })
}

renderPokemon(arrayShuffle((data)));



