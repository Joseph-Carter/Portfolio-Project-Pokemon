const url = "https://pokeapi.co/api/v2/pokemon";
const pokemonListPage = "https://pokeapi.co/api/v2/pokemon?limit=10";
const pokemonContainer = document.querySelector(".pokemon-container");
const searchedPokemon = document.querySelector('.searched-pokemon');

function fetchPokemonCards(pokemonUrl) {
  fetch(pokemonUrl)
    .then((data) => data.json())
    .then((pokemonData) => {
      const pokemonCard = document.createElement("div");
      pokemonCard.classList.add("pokemon-card");

      const imageElement = document.createElement("img");
      imageElement.src = pokemonData.sprites.front_default;
      imageElement.alt = pokemonData.name;
      imageElement.classList.add("pokemon-image");

      const pokemonNameElement = document.createElement("h2");
      pokemonNameElement.innerText = pokemonData.name;
      pokemonNameElement.classList.add("pokemon-name");

      pokemonCard.appendChild(imageElement);
      pokemonCard.appendChild(pokemonNameElement);

      pokemonContainer.appendChild(pokemonCard);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function showSearchedPokemon(json) {
  const pokemonCard = document.createElement("div");
  pokemonCard.classList.add("pokemon-card");

  const imageElement = document.createElement("img");
  imageElement.src = json.sprites.front_default;
  imageElement.alt = json.name;
  imageElement.classList.add("pokemon-image");

  const pokemonNameElement = document.createElement("h2");
  pokemonNameElement.innerText = json.name;
  pokemonNameElement.classList.add("pokemon-name");

  pokemonCard.appendChild(imageElement);
  pokemonCard.appendChild(pokemonNameElement);

  pokemonContainer.innerHTML = "";

  pokemonContainer.appendChild(pokemonCard);
}

function pokemonListing() {
  fetch(pokemonListPage)
    .then((data) => data.json())
    .then((data) => {
      const pokemonArray = data.results;
      pokemonArray.forEach((pokemon) => {
        const pokemonUrl = pokemon.url;
        fetchPokemonCards(pokemonUrl);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

pokemonListing();

const form = document.querySelector("#form");
const input = document.querySelector("input");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = input.value;
  const searchedPokemonUrl = `${url}/${id}`;

  fetch(searchedPokemonUrl)
    .then((data) => data.json())
    .then((json) => {
      showSearchedPokemon(json);
      const offset = parseInt(json.id) + 1;
      const subsequentPokemonUrl = `${url}?limit=10&offset=${offset}`;

      fetch(subsequentPokemonUrl)
        .then((data) => data.json())
        .then((data) => {
          const subsequentPokemonArray = data.results;
          subsequentPokemonArray.forEach((pokemon) => {
            const pokemonUrl = pokemon.url;
            fetchPokemonCards(pokemonUrl);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    })
    .catch((err) => {
      console.error("Error:", err);
      searchedPokemon.innerHTML = `
        <section class="error">
          <p>There was an error!</p>
          <p class="message">${err}</p>
        </section>
      `;
    });
});