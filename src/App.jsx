import React from 'react';
import logo from './logo.svg';
import {Switch, Link, Route} from "react-router-dom";
import Home from './pages/Home'
import Quote from './pages/Quote'
import './App.css';
import Nav from "./components/Nav";


class App extends React.Component{


    state = {
        favoriteSong: []
    }

    render() {
        return (
            <>
                <Nav/>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/quote" component={Quote}/>
                    <Route component={Error}/>
                </Switch>
            </>
        );
    }

}

export default App;
