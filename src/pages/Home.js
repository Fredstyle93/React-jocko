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
                <div className="alert alert-primary callout" role="alert">
                    This is a secondary alert—check it out!
                </div>
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
                                                        <Sounds img={song.imageUrl} index={song.id} title={song.title} soundFile={song.url}/>
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
background-color:#fff;
transition:all ease-in .3s;


&:hover {
box-shadow: 1px 4px 13px 3px rgba(0,0,0,0.2);
}
`

export default Home;