import React, { useState, useEffect } from 'react';
import axios from 'axios';

import fisherYatesShuffle from './functions/fisherYatesShuffle.js';
import Timer from './components/Timer.js'

const AppGameBoard = (props) => {
  // cards list
  const [pokemonList, setPokemonList] = useState([]);
  // timer count down
  const [timerCount, setTimerCount] = useState(40);
  // matched cards count
  const [matchedPairs, setMatchedPairs] = useState(0);
  
  
  useEffect(() => {
    // axios to pokeAPI and store shuffled and spliced pokemon list in state:
    const pokemons = [];

    const getPokemons = async () => {
      try {
        // get all the pokemon names and image urls
        for (let i = 1; i < 152; i++) {
          const pokemon = await axios(`https://pokeapi.co/api/v2/pokemon/${i}`);
          const {id, name, sprites} = pokemon.data;
          pokemons.push({id, name, sprites});
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
  

  useEffect(() => {
    // always rendering timer:
    const timer = setTimeout(() => {
      setTimerCount(timerCount-1);
    }, 1000);
  
    if (matchedPairs === props.cardsAmount / 2) {
      clearInterval(timer);
      // ************************ move to AppWin;
    }

    if (timerCount === 0) {
      clearInterval(timer);
      // ************************ move to AppLose;
    }
  });
  

  return (
    <div className="AppGameBoard">


      <header className="header">
        <div className="warper">
          <ul className="header__list">
            {/* reset game button */}
            <li className="header__list__item">
              {/************* fix below link with router */}
              <a href="index.html" className="header__list__item__reset">
                <div className="header__list__item__reset__arrow"></div>
                <span>Restart</span>
              </a>
            </li>
            {/* timer */}
            <li className="header__list__item">
              <Timer class="header__list__item__timer" timerCount={timerCount} />
            </li>
          </ul>
        </div>
      </header>


      <h1>PokeMatch Game Board</h1>
      {
        pokemonList.map((pokemon) => <li key={pokemon.id}><p>{pokemon.name}</p></li>)
      }


    </div>
  )
}

export default AppGameBoard;