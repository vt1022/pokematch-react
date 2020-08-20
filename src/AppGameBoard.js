import React, { useState, useEffect } from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';

import fisherYatesShuffle from './functions/fisherYatesShuffle.js';
import Timer from './components/Timer.js'
import FlipCard from './components/FlipCard.js'

const AppGameBoard = (props) => {
  const {pokemonFullList, cardsAmount} = props;
  // timer count down
  const [timerCount, setTimerCount] = useState(40);
  // clicks on the cards
  const [clickCount, setClickCount] = useState(0) ;
  // trimmed list for game
  const [gameCards, setGameCards] = useState([]);
  // matched cards count:
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);

  // pokemon cards html:
  const displayCards = pokemon => <FlipCard pokemon={pokemon} handleCardClick={handleCardClick} />;
  // update the click counter every time a flip card is clicked,
  // and add clicked card to array:
  const handleCardClick = (clickedPokeId) => {
    clickedCards.unshift(clickedPokeId);
    const newClickedCards = clickedCards.slice(0, 1);
    
    setClickedCards(newClickedCards);
    setClickCount(clickCount+1);
    console.log(clickedCards);

    // every even clicks, compare the clicked cards
    if ((clickCount + 1) % 2 === 0) {
      console.log('compare now');
    }
  }

  useEffect(() => {
    // take the first x amount of cards from the shuffled full list:
    const cards = fisherYatesShuffle(pokemonFullList).splice(0, cardsAmount / 2);
    // double those cards:
    cards.push(...cards);
    // set cards after full shuffle:
    setGameCards(fisherYatesShuffle(cards));
  }, []);

  useEffect(() => {
    // always rendering timer:
    const timer = setTimeout(() => setTimerCount(timerCount-1), 1000);
    // clear timer on win / lose:
    if (timerCount === 0 || matchedPairs === props.cardsAmount / 2) {
      clearInterval(timer);
    }
    // clear on unmount:
    return () => clearInterval(timer);
  });
  
  
  // if all cards are matched:
  if (matchedPairs === props.cardsAmount / 2) {
    return <Redirect to="/win" />
  }
  // if time runs out:
  if (timerCount === 0) {
    // return <Redirect to="/lose" /> // remove for testing
  }

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

      <div class="wrapper">
        <main class="main">
          {/* testing here ******************* */}
          {clickCount}
          <section class="main__cards-container">
            {gameCards.map(pokemon => displayCards(pokemon))}
          </section>
        </main>
      </div>


    </div>
  )
}

export default AppGameBoard;