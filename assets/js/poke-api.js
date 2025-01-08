const pokeApi = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();

    pokemon.number = pokeDetail.id;
    pokemon.name = pokeDetail.name;
    
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(convertPokeApiDetailToPokemon)
};

pokeApi.getPokemons = (offset = 0, limit = 20) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => ({
            results: jsonBody.results,
            total: jsonBody.count, // Captura o total de Pokémon
        }))
        .then((data) => ({
            pokemons: data.results.map(pokeApi.getPokemonDetail),
            total: data.total,
        }))
        .then((data) => Promise.all(data.pokemons).then((pokemonsDetails) => ({
            pokemons: pokemonsDetails,
            total: data.total,
        })));
};
