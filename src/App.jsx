import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Quote from './pages/Quote';
import './App.css';
import Nav from './components/Nav';

const App = () => (
  <>
    <Nav />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/quote" component={Quote} />
      <Route component={Error} />
    </Switch>
  </>
);

export default App;
