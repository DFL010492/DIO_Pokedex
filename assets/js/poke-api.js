const pokeApi = {}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
}

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map())
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) =>{
            debugger
            console.log(pokemonDetails)
        })
}

Promise.all([
    fetch('https://pokeapi.co/api/v2/pokemon/1'),
    fetch('https://pokeapi.co/api/v2/pokemon/2'),
    fetch('https://pokeapi.co/api/v2/pokemon/3'),
    fetch('https://pokeapi.co/api/v2/pokemon/4'),
    fetch('https://pokeapi.co/api/v2/pokemon/5'),
    fetch('https://pokeapi.co/api/v2/pokemon/6'),
    fetch('https://pokeapi.co/api/v2/pokemon/7'),
    fetch('https://pokeapi.co/api/v2/pokemon/8'),
    fetch('https://pokeapi.co/api/v2/pokemon/9')
]).then((results) => {
    console.log(results)
})