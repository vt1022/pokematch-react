import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import './style/style.css';
import Axios from 'axios';

import AppHome from './AppHome.js';
import AppGameBoard from './AppGameBoard.js';
import AppWin from './AppWin.js';
import AppLose from './AppLose.js';

const App = () => {
  // number of cards for the game (difficulty feature in the future):
  const [cardsAmount, setCardsAmount] = useState(20);
  // full poke list
  const [pokemonFullList, setPokemonFullList] = useState([]);

  useEffect(() => {
    // Axios to pokeAPI and store shuffled and spliced pokemon list in state:
    let source = Axios.CancelToken.source();
    const pokemons = [];

    const getPokemons = async () => {
      try {
        // get all the pokemon names and image urls
        for (let i = 1; i < 152; i++) {
          const pokemon = await Axios.get(
            `https://pokeapi.co/api/v2/pokemon/${i}`, 
            {cancelToken: source.token}
          );
          const {id, name, sprites} = pokemon.data;
          pokemons.push({id, name, sprites});
        }
        setPokemonFullList(pokemons);

      } catch(error) {
        if (Axios.isCancel(error)) {
          console.log('unmounting. request cancelled');
        } else {
          throw error;
        }
      }
    }
    
    getPokemons();
    // cleanup:
    return () => source.cancel();
  }, []);

  return (
    <Router>
      <div className="App">

        <Route exact path='/' component={() => <AppHome cardsAmount={cardsAmount} />} />
        <Route path='/game' component={() => <AppGameBoard pokemonFullList={pokemonFullList} cardsAmount={cardsAmount} />} />
        <Route path='/win' component={AppWin} />
        <Route path='/lose' component={AppLose} />
      </div>
    </Router>
  );
}

export default App;
