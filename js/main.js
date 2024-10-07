import arrayShuffle from "array-shuffle";
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
  const filteredPokemon = data.filter((pokemonObj) => {
    return pokemonObj.name.toLowerCase().includes(input);
  });
  renderPokemon(filteredPokemon);
}

inputEl.addEventListener("input", (e) => {
  handleSearch(e.target.value.trim().toLowerCase());
});
