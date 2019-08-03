import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import Home from './pages/Home';
import Quote from './pages/Quote';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Users from './pages/Users';
import './App.css';
import Menu from './components/Menu';
import * as firebase from 'firebase'
import {config} from "./config/config";
import 'firebase/auth';
import ForgotPassword from "./pages/ForgotPassword";
import UserDetail from './pages/UserDetail';
let refreshToken;
{
    /*admin.initializeApp({
    credential: admin.credential.refreshToken(refreshToken),
    databaseURL: 'https://jocko-b1f23.firebaseio.com.firebaseio.com'
});

const adminvar = admin.initializeApp();*/
}



const firebaseApp = firebase.initializeApp(config);


class App extends React.Component {
    state = {
        user: null,
    };

    authListener = () => {

    firebaseApp.auth().onAuthStateChanged(user => {
        this.getUsers();
        if(user) {
            this.setState({
                user: "",
                users: []
            })
        } else {
            this.setState({
                user:null
            })
        }
    })
    };

    getUsers = nextPageToken => {

        const ref = firebase.database().ref(`/users`);

        ref.on('value', snap => {
            let resp = [];
            if(snap.val() !== null) {
                resp = Object.values(snap.val())
            } else {
                resp = []
            }
            this.setState({users : resp || []})
        })
    };



    componentDidMount() {
        this.authListener();
    }

    render(){
        return(
            <>
                {console.log(this.props)}
                {this.state.user !== null ? (
                    <>
                    <Menu />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/users" users={this.state.users} render={() => <Users props={this.props} users={this.state.users}/>} />
                        <Route exact path="/users/:id" users={this.state.users} component={UserDetail} />
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



export default withRouter(App);
