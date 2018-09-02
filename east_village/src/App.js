import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import EventsList from './components/EventsList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <EventsList/>
      </div>
    );
  }
}

export default App;
