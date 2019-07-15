import React from 'react';
import {songsData} from "./data";
import * as firebase from 'firebase'
import {config} from "./config/config";

const {Provider , Consumer} = React.createContext();

class SongProvider extends React.Component {

    constructor(props) {
        super(props);
        firebase.initializeApp(config);
    }
/*
    componentWillMount() {
        const ref = firebase.database().ref('favoriteSong');

        ref.on('value', snap => {
            this.setState({
                favoriteSong: snap.val()
            })
        });

        console.log(this.state.favoriteSong)
    }

*/
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

        const ref = firebase.database().ref('favoriteSong');

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

    }

    handleAdd = id => {

        const newSong = this.state.initialsong.filter(song => {
                return song.id === id;
        });
        firebase.database().ref('favoriteSong').push(newSong[0]);
        this.syncState();
    }

    removeSong = (id) => {
        this.setState({
            favoriteSong: this.state.favoriteSong.filter(song => {return song.id !== id})
        })
    }

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