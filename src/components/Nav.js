import React from 'react';
import {Link} from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'

import * as firebase from 'firebase';

class Nav extends React.Component{
    state = {
        userInfo: {}
    }
    logout = () => {
        firebase.auth().signOut()
    }

    getUserInfo = () => {
        const ref = firebase.database().ref(`users/${firebase.auth().currentUser.uid}`);

        ref.on('value', snap => {
            this.setState({
                userInfo: Object.values(snap.val())
            })
        })


    }

    componentDidMount() {
        this.getUserInfo();
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">Jocko</a>


                    <div className=" navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link to="/" className="nav-link" href="#">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/quote" className="nav-link" href="#">Favorite</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                               <span className="nav-link">{firebase.auth().currentUser !== null ? this.state.userInfo[2] : ""}</span>
                            </li>                            <li className="nav-item active">
                                <Link onClick={this.logout} to="/" className="nav-link" href="#">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

        )
    }

};

export default Nav;