import './App.css';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Route exact path='/' component={Landing}></Route>
      <Route exact path='/home' component={Home}></Route>
      
      
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
