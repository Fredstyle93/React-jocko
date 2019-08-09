import React from 'react';
import styled from "styled-components";
import * as firebase from 'firebase'
import {FaUser} from "react-icons/fa";
import {Link} from "react-router-dom";
import Experience from '../components/Experience'



class Users extends React.Component{


    state = {
        users : []
    }

    componentDidMount() {
        this.getUsers();
    }

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

    render(){

        return (
            <>
                <h2 className="title">My quote</h2>
             <UsersWrapper className="container">

                 <div className="row user-list">
                     {this.state.users.map(user=> {
                         return(
                             <div className="col-md-12 user-item">
                                 <Link to={"/users/"+user.username}><h5 className="user-title"><FaUser className="icon-menu"/>{user.username}</h5></Link>
                                 <p><span>Level: </span>{user.level}</p>
                                 <p><span>Experience: </span>{user.experience} / {user.nextLevelExperience}</p>
                                <Experience user={user}/>
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