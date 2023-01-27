import React from 'react';
import './App.css';
import Pokedex from './components/Pokedex';
import {
  Routes,
  Route
} from "react-router-dom";
import Favorites from './components/Favorites';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Pokedex />}/>
      <Route path="/favoritos" element={<Favorites/>} />
    </Routes>
  );
}

export default App;
