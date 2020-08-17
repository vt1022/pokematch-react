import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

import fisherYatesShuffle from './functions/fisherYatesShuffle.js';
import Timer from './components/Timer.js'

const AppGameBoard = (props) => {
  const {pokemonFullList, cardsAmount} = props;
  // timer count down
  const [timerCount, setTimerCount] = useState(40);
  // matched cards count
  const [matchedPairs, setMatchedPairs] = useState(0);
  // trimmed list for game
  const [gameCards, setGameCards] = useState([]);
  

  useEffect(() => {
    fisherYatesShuffle(pokemonFullList);
    setGameCards(pokemonFullList.splice(0, cardsAmount / 2));
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
        gameCards.map((pokemon) => <li key={pokemon.id}><p>{pokemon.name}</p></li>)
      }


    </div>
  )
}

export default AppGameBoard;