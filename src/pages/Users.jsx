import React from 'react';
import styled from "styled-components";
import * as firebase from 'firebase'
import {FaUser} from "react-icons/fa";


class Users extends React.Component{

    getUsers = nextPageToken => {

        const ref = firebase.database().ref(`/users`);

        ref.on('value', snap => {
            let resp = [];
            if(snap.val() !== null) {
                resp = Object.values(snap.val())
            } else {
                resp = []
            }
            this.setState({users : resp || []})
        })
    };

    componentDidMount() {
        this.getUsers();
    }

    state = {
        users : []
    }

    render(){

        return (
            <>
                <h2 className="title">My quote</h2>
             <UsersWrapper className="container">

                 <div className="row user-list">
                     {this.state.users.map(user=> {
                         const width = {
                             width: (user.experience * 100 ) / user.nextLevelExperience + "%"
                         };
                         return(
                             <div className="col-md-12 user-item">
                                 <h5 className="user-title"><FaUser className="icon-menu"/>{user.username}</h5>
                                 <p><span>Level: </span>{user.level}</p>
                                 <p><span>Experience: </span>{user.experience} / {user.nextLevelExperience}</p>

                                 <div className="progress">
                                     <div className="progress-bar progress-bar-striped bg-warning progress-bar-animated" role="progressbar"
                                          style={width} aria-valuenow="75" aria-valuemin="0"
                                          aria-valuemax="100"></div>
                                 </div>
                             </div>
                         )
                     })}
                 </div>
             </UsersWrapper>

            </>
        )
    }
};

const UsersWrapper = styled.div`


.user-item {
margin-bottom: 1em;
padding:2em;
box-shadow: -4px 10px 18px -13px rgba(0,0,0,0.75);
}


.user-title {
display: inline-block;
}

.user-img {
width:50px;
}
`;

export default Users