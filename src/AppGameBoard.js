import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Link, NavLink } from 'react-router-dom';

import fisherYatesShuffle from './functions/fisherYatesShuffle.js';
import Timer from './components/Timer.js'

const AppGameBoard = (props) => {
  // cards list
  const [pokemonList, setPokemonList] = useState([]);
  // timer count down
  const [timerCount, setTimerCount] = useState(40);
  // matched cards count
  const [matchedPairs, setMatchedPairs] = useState(0);
  // api loading
  // use loading to set buffering animation
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    // Axios to pokeAPI and store shuffled and spliced pokemon list in state:
    let source = Axios.CancelToken.source();
    const pokemons = [];

    const getPokemons = async () => {

      try {
        // get all the pokemon names and image urls
        for (let i = 1; i < 152; i++) {
          const pokemon = await Axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`, {
            cancelToken: source.token
          });
          const {id, name, sprites} = pokemon.data;
          pokemons.push({id, name, sprites});
          }
        // shuffle the pokemons:
        fisherYatesShuffle(pokemons);
        // take the first x / 2 pokemon for the cards:
        setPokemonList(pokemons.splice(0, props.cardsAmount / 2));

      } catch(error) {
        if (Axios.isCancel(error)) {
          console.log('request cancelled');
        } else {
          throw error;
        }
      }
      
    }
    
    getPokemons();
    // cleanup:
    return () => source.cancel();
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
    // clear on unmount:
    return () => clearInterval(timer);
  });
  

  return (
    <div className="AppGameBoard">


      <header className="header">
        <div className="wrapper">
          <ul className="header__list">
            {/* reset game button */}
            <li className="header__list__item">
              <NavLink className='header__list__item__reset' to='/' exact>
                <div className="header__list__item__reset__arrow"></div>
                <span>Restart</span>
              </NavLink>
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