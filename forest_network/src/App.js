import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Profile from "./components/profile/Profile";
import Follow from "./components/follow/Follow"

class App extends Component {
  render() {
    return (
        <div>
            <Profile/>
          <Follow/>
        </div>

    );
  }
}

export default App;
