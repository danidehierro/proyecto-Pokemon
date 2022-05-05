import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail.jsx';
import PokemonCreate from './components/PokemonCreate/PokemonCreate.jsx';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Route exact path='/' component={Landing}/>
      <Route exact path='/home' component={Home}/>
      <Route path= '/detail/:id' component={Detail}/>
      <Route path= '/pokemons' component={PokemonCreate}/>
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
