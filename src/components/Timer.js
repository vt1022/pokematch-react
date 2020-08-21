import React from 'react';

const Timer = ({ timerCount }) => {

  return(
    <p className="header__list__item__timer">
      {timerCount}
    </p>
  )
}

export default Timer;