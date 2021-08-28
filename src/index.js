import pokemonTpl from "./templates/pokemon.hbs";
import "./crud-p_smolin";

const pokeCardRef = document.querySelector(".pokemon-card");

function fetchPokemon(id) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) =>
    response.json()
  );
}

function renderPokeCard(data) {
  pokeCardRef.insertAdjacentHTML("beforeend", pokemonTpl(data));
}

fetchPokemon("ditto").then(renderPokeCard);
