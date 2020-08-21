import React, { useState, useEffect } from 'react';

import imgPokeball from '../assets/cardBack.png';

const FlipCard = ({ handleCardClick, pokemon }) => {
  const {name, id, sprites} = pokemon;

  const [isFaceUp, setIsFaceUp] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  // matching cards:
  const match = isMatch ? 'matched' : '';
  // flipping cards:
  const flipUp = isFaceUp ? 'flip-card' : '';
  const handleClick = e => {
    setIsFaceUp(true);
    // pass clicks and clicked cards data to AppGameBoard:
    handleCardClick(e.currentTarget);
  }


  return (
    <div class="main__cards-container__card">
      <button 
        onClick={handleClick}
        class={`main__cards-container__inner ${flipUp}`}
        disabled={isFaceUp}
        tabindex="0" 
        aria-label={name}
        data-id={id}
      >
        <div class="main__cards-container__card__front">
          <img src={imgPokeball} alt="pokeball" />
        </div>
        <div class={`main__cards-container__card__back ${match}`}>
          <img src={sprites.front_default} alt={name} class="main__cards-container__card__image" />
        </div>
      </button>
    </div>
  )
}

export default FlipCard;