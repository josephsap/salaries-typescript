import React from 'react';
import './App.css';
import Cars from './Cars';

const App: React.FunctionComponent = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>testing stufff</h1>
        <Cars
          make="Tesla"
          model="Three"
          year={2012}
        />
      </header>
    </div>
  );
};

export default App;
