import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import './App.css';

import AppHome from './AppHome.js';
import AppGameBoard from './AppGameBoard.js';
import AppWin from './AppWin.js';
import AppLose from './AppLose.js';

const App = () => {
  // states:
    // matched cards count
    // timer count down?
    // pokemonListArray
  const [cardsAmount, setCardsAmount] = useState(20);

  // every time timer hits 0, force change page to lose

  return (
    <Router>
      <div className="App">
        <Route exact path='/' component={AppHome} />
        <Route path='/game' component={() => <AppGameBoard cardsAmount={cardsAmount} />} />
        <Route path='/win' component={AppWin} />
        <Route path='/lose' component={AppLose} />
      </div>
    </Router>
  );
}

export default App;
