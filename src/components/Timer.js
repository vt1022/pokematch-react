import React from 'react';

const Timer = (props) => {

  return(
    <p className={props.class}>
      {props.timerCount}
    </p>
  )
}

export default Timer;