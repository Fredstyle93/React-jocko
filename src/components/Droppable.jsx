import React from 'react';
import * as firebase from 'firebase'

export default class Droppable extends React.Component {

        drop = e => {
            e.preventDefault();

            const data = e.dataTransfer.getData('transfer');
            e.currentTarget.appendChild(document.getElementById(data));
            const fireRef = firebase.database().ref(`QuickSound/${firebase.auth().currentUser.uid}`);
            const newSong = this.props.song.filter(oneSong => {
                console.log(oneSong.id)
                return oneSong.id == data;
            });
            if(e.currentTarget.id === "block-1"){
                fireRef.once('child_added',function(snapshot) {
                    snapshot.ref.child(data).child('isSelected').set(true)
                })
            } else if(e.currentTarget.id === "block-2") {
                fireRef.once('child_added',function(snapshot) {
                    snapshot.ref.child(data).child('isSelected').set(false)
                })
            }

        };



        allowDrop = e => {
            e.preventDefault();
        }


    render() {
        return(
                <div className={this.props.showMenu ? "showMenu" : ""} style={this.props.style} id={this.props.id} onDrop={(e) => this.drop(e)} onDragOver={this.allowDrop}>
                    {this.props.children}
                </div>
        )
    }
}