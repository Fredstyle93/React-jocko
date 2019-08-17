import React from 'react'
import Banner from "../components/Banner";
import Sounds from "../components/Sound";
import styled from 'styled-components'
import Search from "../components/Search";
import {SongConsumer} from '../context'
import * as firebase from 'firebase'
import Callout from '../components/Callout'
import Quicksound from "../components/Quicksound";
import {quickSound} from "../data";


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

    importData = () => {

        const dbRef = firebase.database().ref(`QuickSoundList/${firebase.auth().currentUser.uid}`);
        dbRef.once('value', function(snapshot) {
            let exists = (snapshot.val() !== null);
            if(!exists) {
                dbRef.push(quickSound)
            }
        })
    };

    componentDidMount() {
        this.getUserInfo();
        this.importData();

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
                <Quicksound userInfo={this.state.userInfo}/>
            </>
        )
    }

};

const SoundComponent = styled.div`
background-color:#fff;
transition:all ease-in .3s;


&:hover {
box-shadow: 1px 4px 13px 3px rgba(0,0,0,0.2);
}
`

export default Home;