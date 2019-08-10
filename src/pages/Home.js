import React from 'react'
import Banner from "../components/Banner";
import Sounds from "../components/Sound";
import styled from 'styled-components'
import Search from "../components/Search";
import {SongConsumer} from '../context'
import * as firebase from 'firebase'
import Callout from '../components/Callout'
import Quicksound from "../components/Quicksound";

import Draggable from '../components/Draggable'
import Droppable from '../components/Droppable'


class Home extends React.Component {

    getUserInfo = () => {
        const ref = firebase.database().ref(`users/${firebase.auth().currentUser.uid}`);
        ref.on('value', snap => {
            setTimeout(()=>{
                this.setState({
                    userInfo: Object.values(snap.val())
                })
            },300)

        })

    };

    componentDidMount() {
        this.getUserInfo();

    }

    state = {
        isVisible: "hidden",
        userInfo: []
    };

    handleCallout = state => {
        this.setState({isVisible:state})
        setTimeout(() => {this.setState({isVisible:"hidden"})},3000)
    };

    render(){
        return(
            <>
                <Banner/>
                <Callout userInfo={this.state.userInfo} isVisible={this.state.isVisible}/>
                <Search className="search"/>
                <div className="container main-cont">
                    <div className="row">
                        <SongConsumer>
                            {({songs})=> {
                                return(
                                    songs.map(song => {
                                        return(
                                            <>
                                            <div className="col-md-4">
                                                <SoundComponent className="card">
                                                    <Sounds userInfo={this.state.userInfo} handleCallout={this.handleCallout} img={song.imageUrl} index={song.id} title={song.title} soundFile={song.url}/>
                                                </SoundComponent>
                                            </div>
                                            </>
                                        )
                                    })
                                )
                            }}
                        </SongConsumer>
                    </div>
                </div>
                <Quicksound/>

                <h4>DROPPABLE</h4>
                <DropWrapper>
                    <Droppable id="1" style={DroppableStyle}>
                        <Draggable id="item1"><span>item 1</span></Draggable>
                    </Droppable>

                    <Droppable id="2" style={DroppableStyle}>

                    </Droppable>
                </DropWrapper>

            </>
        )
    }

};

const DropWrapper = styled.div`
padding:2em;
display:flex;
justify-content:center;
`
const Item = styled.div`
padding:2em;
color:#fff;
background-color:#000;
`
const DroppableStyle = {
    backgroundColor:'#555',
    width:'250px',
    height: '400px',
    margin: '32px'
}

const SoundComponent = styled.div`
background-color:#fff;
transition:all ease-in .3s;


&:hover {
box-shadow: 1px 4px 13px 3px rgba(0,0,0,0.2);
}
`

export default Home;