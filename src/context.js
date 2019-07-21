import React from 'react';
import {songsData} from "./data";
import * as firebase from 'firebase'


const {Provider , Consumer} = React.createContext();

class SongProvider extends React.Component {
    state = {
        initialsong: songsData,
        songs : songsData,
        query: "",
        favoriteSong: []
    }

    getSong = () => {
        this.setState({songs: this.state.initialsong})
    }

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
                favoriteSong: resp || []
            })
        })

    };

    handleChange = e => {
        this.setState({query: e.target.value});
        if(this.state.query == "") {
            this.setState({songs: this.getSong()})
        }

        this.setState({
            songs: this.state.initialsong.filter(song => {
                const lower = song.title.toLowerCase();
                return(
                    !lower.indexOf(e.target.value.toLowerCase())
                )
            })
        })
    };

    render(){
        return(
            <Provider value={{
                songs: this.state.songs,
                handleChange: this.handleChange,
                handleAdd: this.handleAdd,
                favoriteSong: this.state.favoriteSong,
                initialSong: this.state.initialsong,
                removeSong: this.removeSong,
                syncState: this.syncState
            }}>
                {this.props.children}
            </Provider>
        )
    }
}

export { SongProvider, Consumer as SongConsumer};