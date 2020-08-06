import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  BrowserRouter as Router, 
  Route, Link, NavLink } from 'react-router-dom';
import './App.css';

import fisherYatesShuffle from './components/fisherYatesShuffle.js';

const App = () => {
  // states:
    // matched cards count
    // timer count down?
    // pokemonListArray
  const [cardsAmount, setCardsAmount] = useState(20);
  const [pokemonList, setPokemonList] = useState([]);

  // every time timer hits 0, change the array of pokemon
  // axios to pokeAPI
  useEffect(() => {
    const pokemons = [];

    const getPokemons = async () => {
      try {
        // get all the pokemon names and image urls
        for (let i = 1; i < 152; i++) {
          const pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`);
          const [name, image] = [pokemon.data.name, pokemon.data.sprites.front_default];
          pokemons.push({name, image});
        }
        // shuffle the pokemons:
        fisherYatesShuffle(pokemons);
        // take the first x / 2 pokemon for the cards:
        setPokemonList(pokemons.splice(0, cardsAmount / 2));
      } catch(error) {
        console.log(error);
      }
    }

    getPokemons();
  }, []);
  

  return (
    <Router>
      <div className="App">
        <h1>PokeMatch</h1>
      </div>
    </Router>
  );
}

export default App;
