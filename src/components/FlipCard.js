import React, { useState, useEffect } from 'react';

import imgPokeball from '../assets/cardBack.png';

const FlipCard = (props) => {
  const {name, sprites} = props.pokemon;
  // states:
  const [isFaceUp, setIsFaceUp] = useState(false);

  // flipping cards:
  const flipUp = isFaceUp ? `flip-card` : ``;
  const handleClick = () => {
    setIsFaceUp(true);
  }


  return (
    <div class="main__cards-container__card">
      <button 
        onClick={handleClick}
        class={`main__cards-container__inner ${flipUp}`}
        disabled={isFaceUp}
        tabindex="0" 
        aria-label={name}
      >
        <div class="main__cards-container__card__front">
          <img src={imgPokeball} alt="pokeball" />
        </div>
        <div class="main__cards-container__card__back">
          <img src={sprites.front_default} alt={name} class="main__cards-container__card__image" />
        </div>
      </button>
    </div>
  )
}

export default FlipCard;