import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

import fisherYatesShuffle from './functions/fisherYatesShuffle.js';

const AppHome = (props) => {

  return (
    <div className="AppHome">
      <h1>PokeMatch Home</h1>
      <NavLink 
        activeClassName='currentPage' 
        to='/game'
      >
        Start
      </NavLink>
    </div>
  )
}

export default AppHome;