import React from 'react';
import Sound from 'react-sound';
import {SongConsumer} from "../context";
import {withRouter} from 'react-router-dom'
import {FaPlay , FaStop, FaPause , FaHeart , FaTimes} from "react-icons/fa"
import styled from 'styled-components'
import * as firebase from 'firebase'
import {songsData} from "../data";





class Sounds extends React.Component {

        state = {
            status : Sound.status.STOPPED,
            image: [],
            userInfo:[],
            buttonText: <FaPlay/>,
            initialsong: songsData,
            duration: Sound.status.duration,
            favoriteSong: [],
            currentExp:null,
            currentLevel:null,
            nextLevelExperience:null

        };


        componentDidMount() {
            this.syncState();

            console.log(this.props)
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
            });

    }

    toggleStatus = () => {
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

    handleAdd = id => {
        const newSong = this.state.initialsong.filter(song => {
            return song.id === id;
        });
        firebase.database().ref(`favoriteSong/${firebase.auth().currentUser.uid}`).push({...newSong[0],userId:this.props.userInfo[5]});


        this.syncState();
    };

    removeSong = (id) => {
        this.setState({
            favoriteSong: this.state.favoriteSong.filter(song => {return song.id !== id})
        });
        const song = firebase.database().ref(`favoriteSong/${firebase.auth().currentUser.uid}`);
        var query = song.orderByChild('id').equalTo(id);
        query.once('child_added', function(snapshot) {
            snapshot.ref.remove();
        })
    };

    expUp = () => {

        let userRef = firebase.database().ref(`/users/${firebase.auth().currentUser.uid}`);
        const currentExp = userRef.on('value', snap => {
            const {experience, level, nextLevelExperience} = snap.val();
            this.setState({currentExp:experience,currentLevel:level,nextLevelExperience:nextLevelExperience})
            console.log(this.state);
        });


        let formatedExperience = Math.round(this.state.experience);
        let formatedLevel = this.state.currentLevel;
        let formatedNextLevelExp = this.state.nextLevelExperience;
        formatedExperience = this.state.currentExp += 110;

        if(formatedExperience >= this.state.nextLevelExperience){
            formatedLevel += 1;
            formatedExperience = formatedExperience - formatedNextLevelExp;
            formatedNextLevelExp += 50;
            this.props.handleCallout('visible');

        }
        firebase.database().ref().child(`/users/${firebase.auth().currentUser.uid}`).update({experience: formatedExperience, nextLevelExperience: formatedNextLevelExp, level: formatedLevel});
    };


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
                    (
                        <StyledButton className="heart" onClick={() => this.removeSong(this.props.index)}><FaTimes/></StyledButton>
                    )
                    : (
                        <SongConsumer>
                            {({handleAdd})=>{
                                const haveIt = this.state.favoriteSong.filter(song => { return song.id == this.props.index}).length != 0
                                return(
                                    <StyledButton disabled={haveIt} className="heart" onClick={() => this.handleAdd(this.props.index)}><FaHeart/></StyledButton>
                                )
                            }}
                        </SongConsumer>
                )}
                <div className="card-body text-center">
                    <Sound
                        url={this.props.soundFile}
                        playStatus={this.state.status}
                        onFinishedPlaying={(e) => {this.toggleStatus(); this.expUp()}}
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