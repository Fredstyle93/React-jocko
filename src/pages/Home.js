import React from 'react'
import Banner from "../components/Banner";
import Sounds from "../components/Sound";
import styled from 'styled-components'
import {songsData} from "../data";
import Search from "../components/Search";
import {SongConsumer} from '../context'

class Home extends React.Component {

    render(){
        return(
            <>
                <Banner/>
                <Search className="search"/>
                <div className="container main-cont">
                    <div className="row">
                        <SongConsumer>
                            {({songs})=> {
                                return(
                                    songs.map(song => {
                                            return(
                                                <div className="col-md-4">
                                                    <SoundComponent className="card">
                                                        <Sounds index={song.id} title={song.title} soundFile={song.url}/>
                                                    </SoundComponent>
                                                </div>
                                            )
                                        })
                                )
                            }}
                        </SongConsumer>
                    </div>
                </div>

            </>
        )
    }

};

const SoundComponent = styled.div`
background-color:grey;
height:100px;
box-shadow: 10px 10px 44px -10px rgba(0,0,0,0.75);
`

export default Home;