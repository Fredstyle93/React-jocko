import React from 'react';
import jocko_bg from '../images/jocko_5.jpg';
import Sound from 'react-sound';
import QuicksoundButton from "./Quicksound-button";
import Draggable from '../components/Draggable'
import Droppable from '../components/Droppable'
import styled from "styled-components";
import {QuickMenu} from "../styledComponents/DropMenu";
import {FaCog} from "react-icons/fa";
import * as firebase from 'firebase'

class Quicksound extends React.Component{

    playSound = () => {
        this.setState({status: Sound.status.PLAYING})
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        const ref = firebase.database().ref(`QuickSound/${firebase.auth().currentUser.uid}`);
        ref.on('value', snap => {
            const resp = Object.values(snap.val());
            setTimeout(()=>{
                this.setState({initialSoundSection: resp[0] || [], initialSoundMenu: resp[0] || []})
            },300)

        })
    }

    toggleMenu = () => {
        if(this.state.isDisplay) {
            this.setState({isDisplay:false});
        }else {
            this.setState({isDisplay:true});
        }
    }

    state = {
        status: Sound.status.STOPPED,
        initialSoundSection: [],
        initialSoundMenu: [],
        favoriteSound: [],
        QuickSound: [],
        isDisplay: false,
    };

    render() {
        return(
            <div className="container quicksound-section">
                <div className="row">
                    <div className="col-md-6">
                        <Droppable song={this.state.initialSoundSection} id="block-2">
                        <div className="row">

                            {/*this.state.initialSoundSection.map((sound, key) => {
                                return(
                                    sound.isSelected == false  ? (
                                        <div onDragStart={this.toggleMenu} onDragEnd={this.toggleMenu} className="inline-button">
                                            <Draggable id={key}>
                                                <QuicksoundButton icon={sound.icon} url={sound.url}/>
                                            </Draggable>
                                        </div>
                                    ) : ""

                                )
                            })*/}
                            {this.state.initialSoundSection.map((sound, key) => {
                                return(
                                    <div onDragStart={this.toggleMenu} onDragEnd={this.toggleMenu} className="inline-button">
                                        <Draggable id={key}>
                                            <QuicksoundButton icon={sound.icon} url={sound.url}/>
                                        </Draggable>
                                    </div>
                                )
                            })}
                        </div>
                        </Droppable>
                    </div>
                    <div className="col-md-6">
                        <div className="background-quicksound">
                            <img src={jocko_bg} alt=""/>
                        </div>
                    </div>
                </div>
                <DropWrapper>
                        <Droppable style={QuickMenu} song={this.state.initialSoundMenu} id="block-1" showMenu={this.state.isDisplay}>
                            { /*this.state.initialSoundMenu.map((sound, key) => {
                                return(
                                    sound.isSelected ? (
                                        <Draggable id={key}>
                                            <QuicksoundButton icon={sound.icon} url={sound.url}/>
                                        </Draggable>
                                    ) : ""

                                )
                            })*/}

                        </Droppable>
                </DropWrapper>
            </div>
        )
    }

}

const DropWrapper = styled.div`
padding:2em;
display:flex;
justify-content:center;
`;

export default Quicksound;