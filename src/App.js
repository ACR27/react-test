import React, { Component } from 'react';
import './App.css';
import Scoreboard from './components/scoreboard/scoreboard';
//import uuid from 'uuid';




class App extends Component {
    constructor() {
        super();
        this.sport = "nfl";
    };

    render() {
    return (
      <div id="app">
          <h1>React App</h1>
          <Scoreboard sport={this.sport} />
          <Scoreboard sport="nba" />
      </div>
    );
  }
}

export default App;
