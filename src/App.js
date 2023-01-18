import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import Tracker from './Tracker';
import Info from './Info';
import Tasks from './Tasks';
import Categories from './Categories';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className='App'>
          <nav>
            <div className='links'>
              <Link to='/'>Seuranta</Link>
              <Link to='/tasks'>Tehtävät</Link>
              <Link to='/categories'>Kategoriat</Link>
              <Link to='/info'>Tietoa</Link>
            </div>
          </nav>

          <Routes>
            <Route path='/' element={<Tracker />} />
            <Route path='/tasks/*' element={<Tasks />} />
            <Route path='/categories/*' element={<Categories />} />
            <Route path='info/*' element={<Info />} />
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;

// npx json-server -H localhost -p 3010 -w ./db.json
