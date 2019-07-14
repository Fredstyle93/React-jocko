import React from 'react';
import {songsData} from "./data";

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

    handleAdd = id => {
        const newSong = this.state.initialsong.filter(song => {
                return song.id === id;
        });

        this.setState({
            favoriteSong: [...this.state.favoriteSong, newSong[0] ]
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
                favoriteSong: this.state.favoriteSong
            }}>
                {this.props.children}
            </Provider>
        )
    }
}

export { SongProvider, Consumer as SongConsumer};