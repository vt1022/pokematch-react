import React from 'react';
import { NavLink } from 'react-router-dom';



const AppHome = () => {
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