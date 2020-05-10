import React from 'react';
import './App.css';
import UnitedStatesMap from './components/UsMap';
import Title from './components/Title';

const App = () => {
  return (
    <div className="main-wrapper">
      <Title />
      <div className="container">
        <UnitedStatesMap />
      </div>
    </div>
  );
};

export default App;
