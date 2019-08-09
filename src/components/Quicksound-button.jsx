import React from 'react';
import Sound from 'react-sound';
import styled from 'styled-components'

class QuicksoundButton extends React.Component{

    playSound = () => {
        this.setState({status: Sound.status.PLAYING})
    }

    state = {
        status: Sound.status.STOPPED
    }

    render() {
        return(
            <>
            <ButtonWrapper onClick={this.playSound}>{this.props.icon}</ButtonWrapper>
            <Sound playStatus={this.state.status} onClick url={this.props.url} />
            </>
        )
    }

}

const ButtonWrapper = styled.button`
background-color: #C14242;

border:0;
border-radius: 50%;
color: #fff;
padding: .5em;
width: 4em;
height: 4em;
text-align: center;
line-height: 1;

svg {
transform: scale(1.7);
}

&:hover {
box-shadow: 6px 10px 22px -9px rgba(0,0,0,0.44);
}
`

export default QuicksoundButton;