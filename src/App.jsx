import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState([]);

  async function getPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/generation/6/');
    const allResponse = await response.json();
    const filtered = allResponse.pokemon_species;
    return filtered;
  }

  useEffect(() => {
    async function fetchProcessPokemon() {
      const firstPokemon = await getPokemon();
      const allPokemons = firstPokemon.slice(0, 20);
      const filteredPokemon = allPokemons.map((pokemon) => {
        const splitArr = pokemon.url.split('/');
        const id = splitArr[splitArr.length - 2];
        return {
          name: pokemon.name,
          img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          id: id,
        };
      });

      setPokemons(filteredPokemon);
    }

    fetchProcessPokemon();
  }, []);

  console.log(pokemons);

  return (
    <>
      {pokemons.map((pokemon) => {
        return (
          <div key={pokemon.id}>
            <img src={pokemon.img}></img>
            {pokemon.name}
          </div>
        );
      })}
    </>
  );
}

export default App;