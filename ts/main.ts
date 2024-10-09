import arrayShuffle from "array-shuffle";
import Fuse from "fuse.js";

import "../scss/main.scss"

import data from "./data.json";
import { Pokemon } from "./components/PokemonCard";

const inputEl = document.querySelector("input");
const dataRow = document.querySelector("[data-pokemon-row]");

function renderPokemon(list) {
  dataRow.textContent = "";
  if (!list.length) {
    const pokemon = Pokemon({
      image:
        "https://imgs.search.brave.com/bVXsJxVzfePeSV622nDr57W5kFg22k7gH4Gmel8tv3E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nZXR3/YWxscGFwZXJzLmNv/bS93YWxscGFwZXIv/ZnVsbC9mL2YvZS82/MjYyNDcuanBn",
      name: "Not Found",
      description: "Try Anther Search",
      
    });
    dataRow.appendChild(pokemon);
  }

  list.forEach((pokemonObj) => {
    const pokemon = Pokemon(pokemonObj);
    dataRow.appendChild(pokemon);
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
  const options = {
    keys: ["name", "abilities"],
    threshold: 0.5,
  };
  const fuse = new Fuse(data, options);

  function performSearch() {
    if (!input) return data;

    const search = fuse.search(input);
    return search.map((obj) => obj.item);
  }
  const filteredPokemon = performSearch();
  renderPokemon(filteredPokemon);
}

let debounceTimer;
inputEl.addEventListener("input", (e) => {
  debounceTimer = setTimeout(() => {
    handleSearch(e.target.value.trim().toLowerCase());
    handleSearch(currentInput);
  }, 500);
});
