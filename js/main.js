import data from "./data.json"
import {Pokemon} from "./components/PokemonCard"
import arrayShuffle from 'array-shuffle';

const inputEl = document.querySelector("input")


function renderPokemon(list){
  list.forEach((pokemonObj)=>{
    Pokemon(pokemonObj)
  })
}

renderPokemon(arrayShuffle((data)));

//Add slash to active search

document.addEventListener("keydown",(e)=>{
  if(e.key === "/"){
    e.preventDefault()
    inputEl.focus()
  }
})

function handleSearch(input){
  console.log("Hello");
}

inputEl.addEventListener("keypress",(e)=>{
  handleSearch(e.target.value)
})