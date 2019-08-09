import React from 'react';
import jocko_bg from '../images/jocko_5.jpg';
import Sound from 'react-sound';
import {quickSound} from '../data'
import QuicksoundButton from "./Quicksound-button";

class Quicksound extends React.Component{

    playSound = () => {
        this.setState({status: Sound.status.PLAYING})
    }

    componentDidMount() {

    }

    state = {
        status: Sound.status.STOPPED,
        initialSound: quickSound,
        QuickSound: [],
    };

    render() {
        return(
            <div className="container quicksound-section">

                <div className="row">
                    <div className="col-md-6">
                        <div className="row">
                            {this.state.initialSound.map(sound => {
                                return(
                                    <div className="col-md-2">
                                        <QuicksoundButton icon={sound.icon} url={sound.url}/>
                                    </div>
                                )
                            })}

                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="background-quicksound">
                            <img src={jocko_bg} alt=""/>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}

export default Quicksound;