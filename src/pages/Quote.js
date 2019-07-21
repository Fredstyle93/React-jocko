import React from 'react';
import Sounds from "../components/Sound";
import styled from "styled-components";
import * as firebase from 'firebase'
import Callout from "../components/Callout";

class Quote extends React.Component{

    syncState = () => {
        const ref = firebase.database().ref(`favoriteSong/${firebase.auth().currentUser.uid}`);
        ref.on('value', snap => {
            let resp = [];
            if(snap.val() !== null) {
                resp = Object.values(snap.val())
            } else {
                resp = []
            }
                this.setState({
                    favoriteSong: resp
                })
        });
    };

    getUserInfo = () => {
        const ref = firebase.database().ref(`users/${firebase.auth().currentUser.uid}`);
        ref.on('value', snap => {
            this.setState({
                userInfo: Object.values(snap.val())
            })
        })
    };


    componentDidMount() {
        this.syncState();
        this.getUserInfo();
    }

    state = {
        favoriteSong:[],
        isVisible: "hidden",
        userInfo: []
    }


    handleCallout = state => {
        this.setState({isVisible:state})
        setTimeout(() => {this.setState({isVisible:"hidden"})},3000)
    };

    render(){

        return (
            <>
                <h2 className="title">My quote</h2>
                <Callout userInfo={this.state.userInfo} isVisible={this.state.isVisible}/>
                <div className="container">
                    <div className="row">
                        {
                        this.state.favoriteSong !== undefined ? (
                                this.state.favoriteSong.map(song => {
                                    return(
                                        <div className="col-md-4">
                                            <SoundComponent className="card">
                                                <Sounds handleCallout={this.handleCallout} img={song.imageUrl} index={song.id} title={song.title} soundFile={song.url}/>
                                            </SoundComponent>
                                        </div>
                                    )
                                })
                            ):
                            <h2>Vous n'avez pas encore de quote favorite</h2>
                        }
                    </div>
                </div>
            </>
        )
    }
};

const SoundComponent = styled.div`
background-color:#fff;
transition:all ease-in .3s;


&:hover {
box-shadow: 1px 4px 13px 3px rgba(0,0,0,0.2);
}
`;

export default Quote