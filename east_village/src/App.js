import React, { Component } from 'react';

import EventsList from './components/EventsList';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div >
          <h1>East Village Events</h1>   
        </div>
        <div className="jumbotron" style={{padding:"10px 5px"}}>
          <h3>Welcome Offical Website of East Village!</h3>      
          <p>Get up to date information about top 20 events near you. Click on the events to see exact location on map and other additional information</p>
        </div>
        <EventsList/>
      </div>
    );
  }
}

export default App;

