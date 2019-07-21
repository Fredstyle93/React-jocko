import React from 'react';
import {SongConsumer} from "../context";
import Sounds from "../components/Sound";
import styled from "styled-components";
import * as firebase from 'firebase'

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
            console.log();
                this.setState({
                    favoriteSong: resp
                })
        });
    };

    componentDidMount() {
        this.syncState();
    }

    state = {
        favoriteSong:[]
    }

    render(){

        return (
            <>
                <h2>My quote</h2>
                <div className="container">
                    <div className="row">
                        {
                        this.state.favoriteSong !== undefined ? (
                                this.state.favoriteSong.map(song => {
                                    return(
                                        <div className="col-md-4">
                                            <SoundComponent className="card">
                                                <Sounds img={song.imageUrl} index={song.id} title={song.title} soundFile={song.url}/>
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