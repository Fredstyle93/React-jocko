import React from 'react';
import {SongConsumer} from "../context";

const Search = () => {
    return (
        <div>
            <SongConsumer>
                {({handleChange})=> {
                    return(
                        <input className="form-control" onChange={(e) => handleChange(e)} type="text" placeholder="Search" aria-label="Search" />
                    )
                }}

            </SongConsumer>
        </div>
    )
};

export default Search;