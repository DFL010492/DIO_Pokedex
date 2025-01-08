const pokemonList = document.getElementById('pokemonList');
const pagination = document.getElementById('pagination');

const limit = 20;
let offset = 0;
let totalPokemons = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then(({ pokemons, total }) => {
        totalPokemons = total; // Armazena o total de Pokémon

        const newHtml = pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>
        `).join('');
        pokemonList.innerHTML = newHtml;

        createPagination(offset, limit, total);
    });
}

function createPagination(offset, limit, total) {
    const totalPages = Math.ceil(total / limit); // Calcula o número total de páginas
    const currentPage = offset / limit + 1;

    const pages = [];

    // Adiciona a primeira página, se não for a primeira página e não for a página 2
    if (currentPage > 1 && currentPage !== 2) {
        pages.push(1); // Primeira página
    }

    // Adiciona a página anterior, se não for a primeira página
    if (currentPage > 1) {
        pages.push(currentPage - 1); // Página anterior
    }

    // Adiciona a página atual
    pages.push(currentPage);

    // Adiciona a página seguinte, se não for a última página
    if (currentPage < totalPages) {
        pages.push(currentPage + 1); // Página seguinte
    }

    // Sempre adiciona a última página, caso não tenha sido adicionada
    if (!pages.includes(totalPages)) {
        pages.push(totalPages); // Última página
    }

    // Renderiza a barra de navegação com botões
    pagination.innerHTML = `
        <div class="pagination-buttons">
            ${pages.map((page) => `
                <button 
                    class="pagination-button ${page === currentPage ? 'active' : ''} 
                        ${page == 1 ? 'first' : ''} 
                        ${page === totalPages ? 'last' : ''}" 
                    onclick="goToPage(${page})">
                    ${page}
                </button>
            `).join('')}
        </div>
        <div class="pagination-input">
            <input type="number" id="pageInput" min="1" max="${totalPages}" value="${currentPage}" />
            <button onclick="goToPageFromInput()">Ir</button>
        </div>
        <div class="pagination-max-page">
            <span>Última página: ${totalPages}</span>
        </div>
    `;

    // Adiciona o evento de pressionamento de tecla para o campo de entrada
    const input = document.getElementById('pageInput');
    input.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            goToPageFromInput(); // Chama a função de navegação quando Enter é pressionado
        }
    });
}

// Função para navegar até a página digitada no input
function goToPageFromInput() {
    const input = document.getElementById('pageInput');
    const page = parseInt(input.value, 10);
    const totalPages = Math.ceil(totalPokemons / limit);

    if (page >= 1 && page <= totalPages) {
        offset = (page - 1) * limit;
        loadPokemonItens(offset, limit);
    } else {
        alert('Número de página inválido');
    }
}



function goToPage(page) {
    offset = (page - 1) * limit;
    loadPokemonItens(offset, limit);
}

// Inicializa com a primeira página
loadPokemonItens(offset, limit);
