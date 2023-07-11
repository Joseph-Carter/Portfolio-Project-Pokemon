const url = "https://pokeapi.co/api/v2/pokemon";
const pokemonListPage = "https://pokeapi.co/api/v2/pokemon?limit=10"

//make an api request to fetch the first 10 pokemon
fetch(pokemonListPage)
    .then(data => data.json())
    .then(data => {
        const pokemonList = document.getElementById('pokemon-list');
        const pokemonArray = data.results

        pokemonArray.forEach(pokemon => {
            fetch(pokemon.url)
                .then(data => data.json())
                .then(pokemonData => {
                    const pokemonName = pokemonData.name;
                    const pokemonImage = pokemonData.sprites.front_default;

                    const pokemonCard = document.createElement('div')
                    pokemonCard.classList.add('pokemon-card');

                    const imageElement = document.createElement('img');
                    imageElement.src = pokemonImage;
                    imageElement.alt = pokemonName;
                    imageElement.classList.add('pokemon-image');

                    const pokemonNameElement = document.createElement('h2');
                    pokemonNameElement.innerText = pokemonName;
                    pokemonNameElement.classList.add('pokemon-name');

                    pokemonCard.appendChild(imageElement)
                    pokemonCard.appendChild(pokemonNameElement);

                    pokemonList.appendChild(pokemonCard)

                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }); 
    })
    .catch(error => {
        console.error('Error:', error)
    })