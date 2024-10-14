import arrayShuffle from "array-shuffle";
import Fuse from "fuse.js";
import { Pokemon } from "./interfaces/Pokemon";

import "../scss/main.scss";

import data from "./data.json";
import { PokemonCard } from "./components/PokemonCard";

const inputEl = document.querySelector("input") as HTMLInputElement;
const dataRow = document.querySelector("[data-pokemon-row]") as HTMLDivElement;

function renderPokemon(list: Object[]): void {
  dataRow.textContent = "";
  if (!list.length) {
    const pokemon = PokemonCard({
      image:
        "https://imgs.search.brave.com/bVXsJxVzfePeSV622nDr57W5kFg22k7gH4Gmel8tv3E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9nZXR3/YWxscGFwZXJzLmNv/bS93YWxscGFwZXIv/ZnVsbC9mL2YvZS82/MjYyNDcuanBn",
      name: "Not Found",
      description: "Try Anther Search",
    });
    dataRow.appendChild(pokemon);
  }

  const fragment = document.createDocumentFragment();
  list.forEach((pokemonObj) => {
    const pokemon = PokemonCard(pokemonObj);
    fragment.appendChild(pokemon);
  });
  dataRow.appendChild(fragment);
}

renderPokemon(arrayShuffle(data));

document.addEventListener("keyup", (e: KeyboardEvent) => {
  if (e.key === "/") {
    inputEl.focus();
  }
});

function handleSearch(input: string): void {
  const options = {
    keys: ["name", "abilities"],
    threshold: 0.5,
  };
  const fuse = new Fuse(data, options);

  function performSearch(): Pokemon[] {
    if (!input) return data;

    const search = fuse.search(input);
    return search.map((obj) => obj.item);
  }
  const filteredPokemon = performSearch();
  renderPokemon(filteredPokemon);
}

let debounceTimer: ReturnType<typeof setTimeout>;
inputEl.addEventListener("input", (e) => {
  const target = e.target as HTMLInputElement;
  debounceTimer = setTimeout(() => {
    const currentInput = target.value.trim().toLowerCase();
    handleSearch(currentInput);
  }, 500);
});
