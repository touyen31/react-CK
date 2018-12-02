import React, { Component } from 'react';
import './App.css';
import Profile from "./components/profile/Profile";
import NavBar from "./components/navbar/NavBar";
class App extends Component {
  render() {
    return (
        <div>
            <NavBar/>
            <Profile/>

        </div>

    );
  }
}

export default App;
