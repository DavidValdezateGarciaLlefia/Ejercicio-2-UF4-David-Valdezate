let pokemons = [
    {
        "id": 24,
        "nombre": "arbok",
        "imagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/24.png",
        "tipo": ["poison"],
        "peso": 650,
        "altura": 35
    },
    {
        "id": 56,
        "nombre": "mankey",
        "imagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/56.png",
        "tipo": ["fighting"],
        "peso": 280,
        "altura": 5
    },
    {
        "id": 80,
        "nombre": "slowbro",
        "imagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/80.png",
        "tipo": ["water", "psychic"],
        "peso": 785,
        "altura": 16
    },
    {
        "id": 12,
        "nombre": "butterfree",
        "imagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/12.png",
        "tipo": ["bug", "flying"],
        "peso": 320,
        "altura": 11
    },
    {
        "id": 48,
        "nombre": "venonat",
        "imagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/48.png",
        "tipo": ["bug", "poison"],
        "peso": 300,
        "altura": 10
    },
    {
        "id": 63,
        "nombre": "abra",
        "imagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/63.png",
        "tipo": ["psychic"],
        "peso": 195,
        "altura": 9
    },
    {
        "id": 30,
        "nombre": "nidorina",
        "imagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/30.png",
        "tipo": ["poison"],
        "peso": 200,
        "altura": 8
    },
    {
        "id": 98,
        "nombre": "krabby",
        "imagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/98.png",
        "tipo": ["water"],
        "peso": 65,
        "altura": 4
    },
    {
        "id": 33,
        "nombre": "nidorino",
        "imagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/33.png",
        "tipo": ["poison"],
        "peso": 195,
        "altura": 9
    },
    {
        "id": 61,
        "nombre": "poliwhirl",
        "imagen": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/61.png",
        "tipo": ["water"],
        "peso": 200,
        "altura": 10
    }
  ]
  divPokemons = document.querySelector('#divPokemons')
  let divPokemonsHtml = ''
  for(let x = 0; x < pokemons.length; x++) {
      const pokemon = pokemons[x]; 
  
      divPokemonsHtml += `<div class="col-md-2">
          <div class="card shadow">
              <img src="${pokemon.imagen}" class="card-img-top" alt="${pokemon.nombre}">
              <div class="card-body">
                  <h5 class="card-title">${pokemon.nombre}</h5>
                  <div class="card-text">ID: ${pokemon.id}</div>
                  <div class="card-text">Tipo: ${pokemon.tipo.join(', ')}</div>
                  <div class="card-text">Peso: ${pokemon.peso}</div>
                  <div class="card-text">Altura: ${pokemon.altura}</div>
              </div>
          </div>
      </div>`;
  }
  
  
  divPokemons.innerHTML = divPokemonsHtml;

  async function obtenerPokemons() {    
    const inicio = new Date().getTime();
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();
        
        const pokemonArray = [];

        
        for (let i = 0; i < 12; i++) {
            const pokemonUrl = data.results[i].url;
            const pokemonResponse = await fetch(pokemonUrl);
            const pokemonData = await pokemonResponse.json();
            pokemonArray.push(pokemonData);
        }

        const final = new Date().getTime();
        const tiempoTotal = final - inicio;
        document.querySelector('#timerAsync').innerHTML = tiempoTotal

        return pokemonArray;
    } catch (error) {
        console.error('Error al obtener los datos de los pokemons:', error);
        return [];
    }
}

document.querySelector('#funcAwait').addEventListener('click', async () => {
    const pokemons = await obtenerPokemons();
    mostrarPokemons(pokemons);
});

function mostrarPokemons(pokemons) {
    const divPokemons = document.querySelector('#divPokemons');
    divPokemons.innerHTML = ''; 

    pokemons.forEach(pokemon => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col-md-2');

        const card = document.createElement('div');
        card.classList.add('card', 'shadow');

        const img = document.createElement('img');
        img.src = pokemon.sprites.front_default;
        img.classList.add('card-img-top');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = pokemon.name;

        const id = document.createElement('div');
        id.classList.add('card-text');
        id.textContent = `ID: ${pokemon.id}`;

        const types = document.createElement('div');
        types.classList.add('card-text');
        types.textContent = `Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}`;

        const weight = document.createElement('div');
        weight.classList.add('card-text');
        weight.textContent = `Peso: ${pokemon.weight}`;

        const height = document.createElement('div');
        height.classList.add('card-text');
        height.textContent = `Altura: ${pokemon.height}`;

        cardBody.appendChild(title);
        cardBody.appendChild(id);
        cardBody.appendChild(types);
        cardBody.appendChild(weight);
        cardBody.appendChild(height);

        card.appendChild(img);
        card.appendChild(cardBody);

        cardDiv.appendChild(card);

        divPokemons.appendChild(cardDiv);
    });
}
document.querySelector('#funcThenCatch').addEventListener('click', function() {
    obtenerPokemonsThenCatch();
});

function obtenerPokemonsThenCatch() {
    const inicio = new Date().getTime(); 
    const divPokemons = document.querySelector('#divPokemons');
    divPokemons.innerHTML = ''; 

    fetch('https://pokeapi.co/api/v2/pokemon')
        .then(resp => resp.json())
        .then(respJSON => {
            let promesa = Promise.resolve(); 
            const pokemons = respJSON.results;

            for (let i = 0; i < 12; i++) {
                promesa = promesa.then(() => fetch(pokemons[i].url))
                                 .then(resp => resp.json())
                                 .then(pokemon => {
                                     mostrarPokemon(pokemon);
                                 });
            }

            promesa.then(() => {
                const final = new Date().getTime(); 
                const tiempoTotal = final - inicio;
                console.log('Tiempo total transcurrido:', tiempoTotal, 'ms');
                document.querySelector('#timerThenCatch').innerHTML = tiempoTotal
            });
        })
        .catch(error => {
            console.error('Error al obtener los datos de los Pokémon:', error);
        });
}

function mostrarPokemon(pokemon) {
    const divPokemons = document.querySelector('#divPokemons');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('col-md-2');

    const card = document.createElement('div');
    card.classList.add('card', 'shadow');

    const img = document.createElement('img');
    img.src = pokemon.sprites.front_default;
    img.classList.add('card-img-top');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const title = document.createElement('h5');
    title.classList.add('card-title');
    title.textContent = pokemon.name;

    const id = document.createElement('div');
    id.classList.add('card-text');
    id.textContent = `ID: ${pokemon.id}`;

    const types = document.createElement('div');
    types.classList.add('card-text');
    types.textContent = `Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}`;

    const weight = document.createElement('div');
    weight.classList.add('card-text');
    weight.textContent = `Peso: ${pokemon.weight}`;

    const height = document.createElement('div');
    height.classList.add('card-text');
    height.textContent = `Altura: ${pokemon.height}`;

    cardBody.appendChild(title);
    cardBody.appendChild(id);
    cardBody.appendChild(types);
    cardBody.appendChild(weight);
    cardBody.appendChild(height);

    card.appendChild(img);
    card.appendChild(cardBody);

    cardDiv.appendChild(card);

    divPokemons.appendChild(cardDiv);
}

async function obtenerPokemonsPromise() {
    
    try {
        const inicio = new Date().getTime(); 

        const response = await fetch('https://pokeapi.co/api/v2/pokemon');
        const data = await response.json();

        const pokemonPromises = [];

        for (let i = 0; i < 12; i++) {
            const pokemonUrl = data.results[i].url;
            const pokemonPromise = fetch(pokemonUrl).then(res => res.json());
            pokemonPromises.push(pokemonPromise);
        }

        const pokemons = await Promise.all(pokemonPromises);

        const final = new Date().getTime();
        const tiempoTotal = final - inicio;
        console.log('Tiempo total:', tiempoTotal);
        document.querySelector('#timerPromise').innerHTML = tiempoTotal
        return pokemons;
    } catch (error) {
        console.error('Error al obtener los datos de los pokemons:', error);
        return [];
    }
}

document.querySelector('#promise').addEventListener('click', async () => {
    const pokemons = await obtenerPokemonsPromise();
    mostrarPokemonsPromise(pokemons);
});

function mostrarPokemonsPromise(pokemons) {
    const divPokemons = document.querySelector('#divPokemons');
    divPokemons.innerHTML = '';

    pokemons.forEach(pokemon => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col-md-2');

        const card = document.createElement('div');
        card.classList.add('card', 'shadow');

        const img = document.createElement('img');
        img.src = pokemon.sprites.front_default;
        img.classList.add('card-img-top');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.classList.add('card-title');
        title.textContent = pokemon.name;

        const id = document.createElement('div');
        id.classList.add('card-text');
        id.textContent = `ID: ${pokemon.id}`;

        const types = document.createElement('div');
        types.classList.add('card-text');
        types.textContent = `Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}`;

        const weight = document.createElement('div');
        weight.classList.add('card-text');
        weight.textContent = `Peso: ${pokemon.weight}`;

        const height = document.createElement('div');
        height.classList.add('card-text');
        height.textContent = `Altura: ${pokemon.height}`;

        cardBody.appendChild(title);
        cardBody.appendChild(id);
        cardBody.appendChild(types);
        cardBody.appendChild(weight);
        cardBody.appendChild(height);

        card.appendChild(img);
        card.appendChild(cardBody);

        cardDiv.appendChild(card);

        divPokemons.appendChild(cardDiv);
    });
}

// document.querySelector('#funcThenCatch').addEventListener('click', obtenerPokemonsThenCatch);

// function obtenerPokemonsThenCatch() {
//     const inicio = new Date().getTime();
//     let pokemons = [];
//     fetch('https://pokeapi.co/api/v2/pokemon')
//         .then(resp => {
//             if (!resp.ok) {
//                 throw new Error('No se pudo obtener la lista de pokemons');
//             }
//             return resp.json();
//         })
//         .then(respJSON => {
//             const pokemonPromises = [];
//             for (let i = 0; i < 12; i++) {
//                 pokemonPromises.push(fetch(respJSON.results[i].url).then(resp => {
//                     if (!resp.ok) {
//                         throw new Error(`No se pudo obtener el pokemon ${i+1}`);
//                     }
//                     return resp.json();
//                 }));
//             }
//             return Promise.all(pokemonPromises);
//         })
//         .then(pokemonData => {
//             pokemons = pokemonData;
//             const final = new Date().getTime();
//             const tiempoTotal = final - inicio;
//             console.log('Tiempo total transcurrido:', tiempoTotal, 'ms');
//             mostrarPokemons(pokemons);
//         })
//         .catch(error => {
//             console.error('Error al obtener los datos de los pokemons:', error);
//         });
// }

// function mostrarPokemons(pokemons) {
//     const divPokemons = document.querySelector('#divPokemons');
//     divPokemons.innerHTML = '';
//     pokemons.forEach(pokemon => {
//         const cardDiv = document.createElement('div');
//         cardDiv.classList.add('col-md-2');

//         const card = document.createElement('div');
//         card.classList.add('card', 'shadow');

//         const img = document.createElement('img');
//         img.src = pokemon.sprites.front_default;
//         img.classList.add('card-img-top');

//         const cardBody = document.createElement('div');
//         cardBody.classList.add('card-body');

//         const title = document.createElement('h5');
//         title.classList.add('card-title');
//         title.textContent = pokemon.name;

//         const id = document.createElement('div');
//         id.classList.add('card-text');
//         id.textContent = `ID: ${pokemon.id}`;

//         const types = document.createElement('div');
//         types.classList.add('card-text');
//         types.textContent = `Tipo: ${pokemon.types.map(type => type.type.name).join(', ')}`;

//         const weight = document.createElement('div');
//         weight.classList.add('card-text');
//         weight.textContent = `Peso: ${pokemon.weight}`;

//         const height = document.createElement('div');
//         height.classList.add('card-text');
//         height.textContent = `Altura: ${pokemon.height}`;

//         cardBody.appendChild(title);
//         cardBody.appendChild(id);
//         cardBody.appendChild(types);
//         cardBody.appendChild(weight);
//         cardBody.appendChild(height);

//         card.appendChild(img);
//         card.appendChild(cardBody);

//         cardDiv.appendChild(card);

//         divPokemons.appendChild(cardDiv);
//     });
// }
