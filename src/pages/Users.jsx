import React from 'react';
import styled from "styled-components";
import * as firebase from 'firebase'


class Users extends React.Component{

    getUsers = nextPageToken => {
        /*
        const ref = firebase.database().ref(`/users`);

        ref.on('value', snap => {
            console.log(snap);
        })


        admin.auth().listUsers(100, nextPageToken)
            .then((listUser)=>{
                console.log(listUser);
            }) */
    };

    componentDidMount() {
       // this.getUsers();
    }

    state = {
        users : []
    }

    render(){

        return (
            <>
                users
            </>
        )
    }
};

const UsersWrapper = styled.div`

`;

export default Users