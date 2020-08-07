import React, { useState, useEffect } from 'react';
import axios from 'axios';

import fisherYatesShuffle from './components/fisherYatesShuffle.js';

const AppGameBoard = (props) => {

  const [pokemonList, setPokemonList] = useState([]);
  
  // axios to pokeAPI
  useEffect(() => {
    const pokemons = [];

    const getPokemons = async () => {
      try {
        // get all the pokemon names and image urls
        for (let i = 1; i < 152; i++) {
          const pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`);
          const [id, name, image] = [pokemon.data.id, pokemon.data.name, pokemon.data.sprites.front_default];
          pokemons.push({id, name, image});
        }
        // shuffle the pokemons:
        fisherYatesShuffle(pokemons);
        // take the first x / 2 pokemon for the cards:
        setPokemonList(pokemons.splice(0, props.cardsAmount / 2));
      } catch(error) {
        console.log(error);
      }
    }

    getPokemons();
  }, []);

  return (
    <div className="AppGameBoard">
      <h1>PokeMatch Game Board</h1>
      {
        pokemonList.map((pokemon) => <li key={pokemon.id}>{pokemon.name}</li>)
      }
    </div>
  )
}

export default AppGameBoard;