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
import {quickSound} from "../data";

class Quicksound extends React.Component{

    playSound = () => {
        this.setState({status: Sound.status.PLAYING})
    }

    componentDidMount() {
        try {
            this.fetchData();
            this.fetchDataInit();
        } catch (e) {
        }

    }
    fetchData = () => {
        const ref = firebase.database().ref(`QuickSound/${firebase.auth().currentUser.uid}`);
        ref.on('value', snap => {
            let resp = [];
            if(snap.val() !== null) {
                resp = Object.values(snap.val())
            } else {
                resp = []
            }
            setTimeout(()=>{
                this.setState({favoriteSound: resp})
            },300)

        })
    }

    fetchDataInit = () => {
        const ref = firebase.database().ref(`QuickSoundList/${firebase.auth().currentUser.uid}`);
        ref.on('value', snap => {
            let resp = [];
            if(snap.val() !== null) {
                resp = Object.values(snap.val())
            } else {
                resp = []
            }
            setTimeout(()=>{
                this.setState({initialSoundSection: resp[0]})
            },300)

        })
    }

    toggleMenu = () => {
        if(this.state.isDisplay) {
            document.querySelector('.container, .background-quicksound').classList.remove('modall');
            document.querySelector('.droppable').classList.remove('highlight');
            this.setState({isDisplay:false});
        }else {
            document.querySelector('.container, .background-quicksound').classList.add('modall');
            document.querySelector('.droppable').classList.add('highlight');
            this.setState({isDisplay:true});
        }
    }

    state = {
        status: Sound.status.STOPPED,
        initialSoundSection: [],
        initialSoundMenu: [],
        favoriteSound: [],
        jsonData:quickSound,
        QuickSound: [],
        isDisplay: false,
    };

    render() {
        return(
            <div className="container-fluid quicksound-section">
                <div className="row">
                    <div className="col-md-8 droppable">
                        <Droppable fetchData={this.fetchData} userInfo={this.state.userInfo} song={this.state.initialSoundSection} id="block-2">
                        <div className="row">
                            {this.state.initialSoundSection !== undefined ? (
                                this.state.initialSoundSection.map((sound, key) => {
                                        return(
                                            <div onDragStart={this.toggleMenu} onDragEnd={this.toggleMenu} className="inline-button">
                                                <Draggable id={key}>
                                                    <QuicksoundButton isDisabled={sound.isSelected} icon={sound.icon} url={sound.url}/>
                                                </Draggable>
                                            </div>
                                        )
                                    })
                            ) : ""}

                        </div>
                        </Droppable>
                    </div>
                    <div className="col-md-4">
                        <div className="background-quicksound">
                            <img src={jocko_bg} alt=""/>
                        </div>
                    </div>
                </div>
                <DropWrapper>
                        <Droppable userInfo={this.props.userInfo} fetchData={this.fetchData}  style={QuickMenu} song={this.state.initialSoundSection} id="block-1" showMenu={this.state.isDisplay}>
                            {this.state.initialSoundSection !== undefined ? (
                                this.state.initialSoundSection.map((sound,key) => {
                                    {if(sound.isSelected) {
                                        return(
                                            <div onDragStart={this.toggleMenu} onDragEnd={this.toggleMenu}  className="inline-button">
                                                <Draggable id={sound.id}>
                                                    <QuicksoundButton icon={sound.icon} url={sound.url}/>
                                                </Draggable>
                                            </div>

                                        )
                                    }}

                                    })
                            ) : ""}

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