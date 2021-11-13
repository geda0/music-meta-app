import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import AlbumList from './components/AlbumList';
import TrackList from './components/TrackList';
import TrackDetail from './components/TrackDetail';

class App extends Component {
  render() {
    return (
      <main>
        <Router>
          <div className="container">
            <Link to="/">
              <img
                src={logo}
                alt="React Music"
                style={{ width: 300, display: 'block', margin: 'auto' }}
              />
            </Link>
          </div>

          <Routes>          
            <Route exact path="/" element={<AlbumList />} />
            <Route exact path="/album/:id" element={<TrackList/>} />
            <Route exact path="/track/:id" element={<TrackDetail/>} />
          </Routes>
        </Router>
      </main>
    );
  }
}

export default App;
