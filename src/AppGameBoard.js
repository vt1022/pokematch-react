import React, { useState, useEffect, useRef } from 'react';
import { Redirect, Link, NavLink } from 'react-router-dom';

import Timer from './components/Timer.js'
import FlipCard from './components/FlipCard.js'

const AppGameBoard = ({ pokemonFullList, cardsAmount }) => {

  // timer count down, clicks count on the cards
  const [timerCount, setTimerCount] = useState(40);
  const [clickCount, setClickCount] = useState(0) ;
  // trimmed list for game
  const [gameCards, setGameCards] = useState([]);
  // matched cards count:
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [clickedCards, setClickedCards] = useState([]);


  // shuffle array algorithm:
  const fisherYatesShuffle = (a) => {
    let j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  // pokemon cards html:
  const displayCards = pokemon => {
    return (
      <FlipCard
        pokemon={pokemon} 
        handleCardClick={handleCardClick}
      />
      // make pokemon object and push each obj into an array. take info from that array to put into flipcard. data like flipped up, matched.
    )
  }

  // update the click counter every time a flip card is clicked,
  // and add clicked card to array:
  const handleCardClick = clickedPokeButton => {
    const clickedCard = clickedPokeButton.dataset.id;
    // cut down array to just 2 cards needed for matching comparison:
    setClickedCards([clickedCard, ...clickedCards].slice(0, 2));
    setClickCount(clickCount+1);
  }
  // changed isMatch state in FlipCard
  const handleMatched = () => {


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
    const timer = setTimeout(() => setTimerCount(timerCount-1), 1000);
    // clear timer on win / lose:
    if (timerCount === 0 || matchedPairs === cardsAmount / 2) {
      clearInterval(timer);
    }
    // clear on unmount:
    return () => clearInterval(timer);
  });
  
  useEffect(() => {
    // every even clicks, compare the clicked cards
    if (clickedCards.length === 2 && clickCount % 2 === 0) {
      if (clickedCards[0] === clickedCards[1]) {
        handleMatched();
        console.log('matched!');
      } else if (clickedCards[0] !== clickedCards[1]) {
        console.log('not matched');
      }
    }
  }, [clickedCards]);
  

  // if all cards are matched:
  if (matchedPairs === cardsAmount / 2) {
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
              <Timer timerCount={timerCount} />
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