import React from 'react';
import Sound from 'react-sound';
import {SongConsumer} from "../context";
import {withRouter} from 'react-router-dom'
import {FaPlay , FaStop, FaPause , FaHeart} from "react-icons/fa"



class Sounds extends React.Component {

        state = {
            status : Sound.status.STOPPED,
            buttonText: <FaPlay/>,
            duration: Sound.status.duration
        };

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

        stopPlaying = () => {
            this.setState({
                status: Sound.status.STOPPED,
                buttonText: <FaPlay/>
            })
        };

    render() {
        return (
            <div>
                <h3 className="card-title pt-1">{this.props.title}</h3>
                {this.props.history.location.pathname === '/quote' ? "" : (
                    <SongConsumer>
                        {({handleAdd})=>{
                            return(
                                <i className="heart" onClick={() => handleAdd(this.props.index)}><FaHeart/></i>
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

export default withRouter(Sounds)