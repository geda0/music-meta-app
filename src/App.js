import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';

import AlbumViewer from './AlbumViewer';

class App extends Component {
  render() {
    return (
      <main>
        <AlbumViewer />
      </main>
    );
  }
}

export default App;
