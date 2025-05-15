const container = document.getElementById('pokemon-container');

async function fetchPokemonList() {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
        const data = await res.json();

        for (const pokemon of data.results) {
            const resDetail = await fetch(pokemon.url);
            const detail = await resDetail.json();

            const card = document.createElement('div');
            card.className = 'col-md-4 col-lg-3';
            card.innerHTML = `
        <div class="card h-100 text-center shadow-sm">
          <img src="${detail.sprites.front_default}" class="card-img-top mx-auto mt-3" style="width: 96px;" alt="${detail.name}">
          <div class="card-body">
            <h5 class="card-title text-capitalize">${detail.name}</h5>
          </div>
        </div>
      `;
            container.appendChild(card);
        }
    } catch (error) {
        container.innerHTML = '<div class="alert alert-danger">Error al cargar los Pokémon.</div>';
        console.error('Error fetching Pokémon:', error);
    }
}

fetchPokemonList();
