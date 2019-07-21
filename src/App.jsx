import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home';
import Quote from './pages/Quote';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';
import Nav from './components/Nav';
import * as firebase from 'firebase'
import {config} from "./config/config";
import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth';
import ForgotPassword from "./pages/ForgotPassword";

const firebaseApp = firebase.initializeApp(config);


class App extends React.Component {
    state = {
        user: null,
    };

    authListener = () => {

    firebaseApp.auth().onAuthStateChanged(user => {
        console.log(user)
        if(user) {
            this.setState({
                user: ""
            })
        } else {
            this.setState({
                user:null
            })
        }
    })
    };

    componentDidMount() {
        this.authListener();
    }

    render(){
        return(
            <>

                {this.state.user !== null ? (
                    <>
                    <Nav />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/quote" component={Quote} />
                        <Redirect from="/login" to="/"/>
                        <Route component={Error} />
                    </Switch>
                        </>
                ) : (
                    <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/forgot-password" component={ForgotPassword} />
                    <Redirect from="/" to="/login"/>
                    </Switch>

                )}
            </>


        )
    }

}



export default App;
