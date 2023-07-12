const url = "https://pokeapi.co/api/v2/pokemon";
const pokemonListPage = "https://pokeapi.co/api/v2/pokemon?limit=10";
const searchedPokemon = document.querySelector('.searched-pokemon')

//make an api request to fetch the first 10 pokemon
function pokemonListing(){

    fetch(pokemonListPage)
      .then((data) => data.json())
      .then((data) => {
        const pokemonContainer = document.querySelector(".pokemon-container");
        const pokemonArray = data.results;
    
        pokemonArray.forEach((pokemon, index) => {
          const pokemonId = index + 1;
          const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonId}`;
    
          fetch(pokemonUrl)
            .then((data) => data.json())
            .then((pokemonData) => {
              const pokemonName = pokemonData.name;
              const pokemonImage = pokemonData.sprites.front_default;
    
              const pokemonCard = document.createElement("div");
              pokemonCard.classList.add("pokemon-card");
    
              const imageElement = document.createElement("img");
              imageElement.src = pokemonImage;
              imageElement.alt = pokemonName;
              imageElement.classList.add("pokemon-image");
    
              const pokemonNameElement = document.createElement("h2");
              pokemonNameElement.innerText = pokemonName;
              pokemonNameElement.classList.add("pokemon-name");
    
              pokemonCard.appendChild(imageElement);
              pokemonCard.appendChild(pokemonNameElement);
    
              pokemonContainer.appendChild(pokemonCard);
            })
            .catch((error) => {
              console.error("Error:", error);
            });
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
}
pokemonListing();

const searchButton = document.querySelector('button')
const form = document.querySelector("#form");
const input = document.querySelector("input");
const pokemonInventory = document.querySelector('.searched-pokemon')

searchButton.addEventListener("submit", (event) => {
    event.preventDefault();
    const id = input.value;
    fetch(`${url}/${id}`)
        .then(data => data.json())
        .then(json => {
            showPokemon(json)
            fetch(`${url}?limit=10&offset=${json.id}`)
                .then(data => data.json())
                .then(data => {
                    const pokemonContainer = document.querySelector(".pokemon-container");
                    const pokemonArray = data.results;
                })
        })
        .catch(err => showError(err))
});

