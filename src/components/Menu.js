import React, { Component } from 'react';
import BurgerMenu from 'react-burger-menu';
import * as firebase from "firebase";
import {Link} from "react-router-dom";
import {FaHome, FaHeart , FaArrowLeft, FaUser, FaUsers} from "react-icons/fa";


class Menu extends Component {
    state = {
        currentMenu: 'bubble',
        side: 'left',
        userInfo: {}
    };

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

    getItems = () => {
        let items;
                items = [
                    <Link to="/" className="nav-link" href="#"><FaHome className="icon-menu"/>Home</Link>,
                    <Link to="/quote" className="nav-link" href="#"><FaHeart className="icon-menu"/>Favorite</Link>,
                    <Link to="/users" className="nav-link" href="#"><FaUsers className="icon-menu"/>Users</Link>,
                    <Link onClick={this.logout} to="/" className="nav-link" href="#"><FaArrowLeft className="icon-menu"/>Logout</Link>,
                ];

        return items;
    }

    getMenu() {
        const Menu = BurgerMenu[this.state.currentMenu];
        return (
            <Menu id={this.state.currentMenu} pageWrapId={'page-wrap'} outerContainerId={'outer-container'} right={this.state.side === 'right'}>
                <h4 className="userName"><FaUser className="icon-menu"/>{firebase.auth().currentUser !== null ? this.state.userInfo[2] : ""}</h4>
                {this.getItems()}
            </Menu>
        );
    }

    render() {


        return (
            <div id="outer-container" style={{height: '100%'}}>
                {this.getMenu()}
            </div>
        );
    }
}

const menus = {
    slide: {buttonText: 'Slide', items: 1},
    stack: {buttonText: 'Stack', items: 1},
    elastic: {buttonText: 'Elastic', items: 1},
    bubble: {buttonText: 'Bubble', items: 1},
    push: {buttonText: 'Push', items: 1},
    pushRotate: {buttonText: 'Push Rotate', items: 2},
    scaleDown: {buttonText: 'Scale Down', items: 2},
    scaleRotate: {buttonText: 'Scale Rotate', items: 2},
    fallDown: {buttonText: 'Fall Down', items: 2},
    reveal: {buttonText: 'Reveal', items: 1}
};

export default Menu

