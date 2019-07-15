import React from 'react';
import Sound from 'react-sound';
import {SongConsumer} from "../context";
import {withRouter} from 'react-router-dom'
import {FaPlay , FaStop, FaPause , FaHeart , FaTimes} from "react-icons/fa"
import styled from 'styled-components'
import * as firebase from 'firebase'




class Sounds extends React.Component {

        state = {
            status : Sound.status.STOPPED,
            image: [],
            buttonText: <FaPlay/>,
            duration: Sound.status.duration,
            favoriteSong: []
        };

        componentDidMount() {
            this.syncState()
            console.log(this.state.favoriteSong)
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
                });

    }

    toggleStatus = () => {
    console.log(this.state.duration)
            this.state.status === Sound.status.PLAYING ? (

                this.setState({
                    status: Sound.status.PAUSED,
                    buttonText: <FaPlay/>
                })
            ) : (
                this.setState({
                status: Sound.status.PLAYING,
                    buttonText: <FaPause/>
            })
            )

        };

    removeSong = (id) => {
        this.setState({
            favoriteSong: this.state.favoriteSong.filter(song => {return song.id !== id})
        })
        const song = firebase.database().ref('favoriteSong');
        var query = song.orderByChild('id').equalTo(id);
        query.once('child_added', function(snapshot) {
            snapshot.ref.remove();
        })
    }


        stopPlaying = () => {
            this.setState({
                status: Sound.status.STOPPED,
                buttonText: <FaPlay/>
            })
        };

    render() {
        return (
            <div>
                <img className="card-img-top" src={this.props.img} alt="Card image cap"/>
                <h3 className="card-title pt-1">{this.props.title}</h3>
                {this.props.history.location.pathname === '/quote' ?
                    (                    <SongConsumer>
                        {()=>{
                            return(
                                <StyledButton className="heart" onClick={() => this.removeSong(this.props.index)}><FaTimes/></StyledButton>
                            )
                        }}
                    </SongConsumer>)
                    : (
                    <SongConsumer>
                        {({handleAdd})=>{
                            const haveIt = this.state.favoriteSong.filter(song => { return song.id == this.props.index}).length != 0
                            return(
                                <StyledButton disabled={haveIt} className="heart" onClick={() => handleAdd(this.props.index)}><FaHeart/></StyledButton>
                            )
                        }}
                    </SongConsumer>
                )}


                <div className="card-body text-center">
                    <Sound
                        url={this.props.soundFile}
                        playStatus={this.state.status}
                        onFinishedPlaying={this.toggleStatus}
                        duration={this.state.duration}
                    />
                    <i className="play" onClick={this.toggleStatus}>{this.state.buttonText}</i>
                    <i onClick={this.stopPlaying}><FaStop/></i>
                </div>

            </div>
        );
    }
}

const StyledButton = styled.button`
    background-color: transparent;
    color: black;
    border: none;
    
    &:hover {
    color: white;
    }
    
    &:disabled {
    color: rgba(242, 38, 19, 1)
    }
`;

export default withRouter(Sounds)