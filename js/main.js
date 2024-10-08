import arrayShuffle from "array-shuffle";
import Fuse from "fuse.js"
import data from "./data.json";
import { Pokemon } from "./components/PokemonCard";

const inputEl = document.querySelector("input");
const dataRow = document.querySelector("[data-pokemon-row]");

function renderPokemon(list) {
  dataRow.textContent = "";
  list.forEach((pokemonObj) => {
    const pokemon = Pokemon(pokemonObj);
    dataRow.appendChild(pokemon)
  });
}

renderPokemon(arrayShuffle(data));

document.addEventListener("keydown", (e) => {
  if (e.key === "/") {
    e.preventDefault();
    inputEl.focus();
  }
});

function handleSearch(input) {
  const fuse = new Fuse(data,{
    keys:["name","description"]
  });
  const search = fuse.search(input)

  const filteredPokemon  =  search.map((obj)=>obj.item)
  renderPokemon(filteredPokemon);
  
}

inputEl.addEventListener("input", (e) => {
  handleSearch(e.target.value.trim().toLowerCase());
});
