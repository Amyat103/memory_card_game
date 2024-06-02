import { useState, useEffect } from 'react';
import './App.css';
import ScoreBoard from './components/ScoreBoard';

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);

  async function getPokemon() {
    const response = await fetch('https://pokeapi.co/api/v2/generation/6/');
    const allResponse = await response.json();
    const filtered = allResponse.pokemon_species;
    return filtered;
  }

  useEffect(() => {
    async function fetchProcessPokemon() {
      const firstPokemon = await getPokemon();
      const allPokemons = firstPokemon.slice(0, 18);
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

  function resetScore() {
    setScore(0);
  }

  function processClick(name) {
    if (!selected.includes(name)) {
      setSelected((prev) => [...prev, name]);
      setScore((prevScore) => prevScore + 1);
    } else {
      resetScore();
    }
  }

  // console.log(pokemons);

  function createCard(poke) {
    return (
      <div
        className='pokemon'
        key={poke.id}
        id={poke.name}
        onClick={() => processClick(poke.name)}
      >
        <img src={poke.img} alt={poke.name}></img>
        <h2>{poke.name}</h2>
      </div>
    );
  }

  return (
    <>
      <ScoreBoard score={score} />
      <div className='main'>
        <div className='grid-container'>
          {pokemons.map((pokemon) => {
            return createCard(pokemon);
          })}
        </div>
      </div>
    </>
  );
}

export default App;
