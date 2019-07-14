import React from 'react';
import {SongConsumer} from "../context";
import Sounds from "../components/Sound";
import styled from "styled-components";

const Quote = () => {
    return (
        <>
        <h2>My quote</h2>

            <div className="container">
                <div className="row">
                    <SongConsumer>
                        {({favoriteSong})=> {
                            console.log(favoriteSong)
                            return(
                                favoriteSong !== undefined ? (
                                    favoriteSong.map(song => {
                                        return(
                                            <div className="col-md-4">
                                                <SoundComponent className="card">
                                                    <Sounds index={song.id} title={song.title} soundFile={song.url}/>
                                                </SoundComponent>
                                            </div>
                                        )
                                    })
                                    ):
                                    ""

                            )
                        }}
                    </SongConsumer>
                </div>
            </div>
        </>
    )
}

const SoundComponent = styled.div`
background-color:grey;
height:200px;
box-shadow: 10px 10px 44px -10px rgba(0,0,0,0.75);
`

export default Quote