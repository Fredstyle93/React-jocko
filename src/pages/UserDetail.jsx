import React from 'react';
import * as firebase from 'firebase';
import Experience from "../components/Experience";
import styled from 'styled-components'
import profile from '../images/profile.png'
import Sounds from "../components/Sound";
import {FaCog, FaUpload} from "react-icons/fa";
import Callout from "../components/Callout";


class UserDetail extends React.Component {

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

    componentDidUpdate() {
        setTimeout(()=>{

            const user = this.state.users.filter((user) => {
                return user.username === this.props.match.params.id
            })
            const currentUser = user[0];
            this.setState({user:currentUser});
        },300);
    }

    componentDidMount() {
        this.getUserInfo();
      const ref = firebase.database().ref('/users');

        ref.on('value', snap => {
            this.setState({usersRef:snap.val()})
            let resp = [];
            if(snap.val() !== null) {
                resp = Object.values(snap.val())
            } else {
                resp = []
            }
            this.setState({users : resp || []})
        });


        setTimeout(()=>{

            const user = this.state.users.filter((user) => {
                return user.username === this.props.match.params.id
            })
            const currentUser = user[0];
            this.setState({user:currentUser});
            const favoriteRef = firebase.database().ref('/favoriteSong/'+this.state.user.uid);
            favoriteRef.on('value', snap => {
                let resp = [];
                if(snap.val() !== null) {
                    resp = Object.values(snap.val())
                } else {
                    resp = []
                }
                this.setState({userFavorite : resp || []})

            })
        },300);

    }


    state = {
        usersRef:[],
        users: [],
        user: {},
        width: {},
        userInfo:[],
        userFavorite: [],
        isVisible: "hidden",
        isEditing:false,
        image: null,
        userImage:"",
    };

    handleEditing = () => {
        if(!this.state.isEditing) {
            this.setState({isEditing:true})
        }else {
            this.setState({isEditing:false})
        }
    };

    handleUploadChange = e => {
        if(e.target.files[0]){
            const image = e.target.files[0];
            this.setState(()=>({image, isEditing:true}))

        }
    };

    handleUpload = async () => {
        //console.log(this.state.image);
        const blob = new Blob([this.state.image.name], { type: this.state.image.type });
        const storageRef = firebase.storage().ref();
        const image = storageRef.child(`images/${this.state.userInfo[6]}/${this.state.image.name}`).put(this.state.image)
            .then(()=>{
                storageRef.child(`images/${this.state.userInfo[6]}/${this.state.image.name}`).getDownloadURL().then(url => {
                    this.setState({userImage: url});
                    this.setState({isEditing:false});
                    const userRef = firebase.database().ref('/users').child(this.state.userInfo[6]).update({avatar:url}).then(() => {
                       this.getUserInfo();
                    })
                })
            });
};

    handleCallout = state => {
        this.setState({isVisible:state})
        setTimeout(() => {this.setState({isVisible:"hidden"})},3000)
    };

    render(){
        return(
            <>
                <Callout userInfo={this.state.userInfo} isVisible={this.state.isVisible}/>
            <UserProfile>
                <div className="top-profile">
                    <div className="user">
                         <span className="img-container">
                        <div className="img">
                                <img src={this.state.user.avatar !== "" ? this.state.user.avatar: profile} alt=""/>
                                {this.state.userInfo[7] !== undefined ? (
                                        this.state.userInfo[7] === this.state.user.username ?<label className="change-icon" for="input-file"> <FaCog/><input onChange={(e) => this.handleUploadChange(e)} id="input-file" type="file"/></label>: '')
                                    : ""}
                        </div>
                         </span>
                        <h4 className="profile-name">
                            {this.state.user.username} </h4>
                            <p>{this.state.user.email}</p>
                    </div>
                    {this.state.isEditing ? <button className="button-send" onClick={this.handleUpload}>send</button> : ''}
                </div>

                <div className="mid-profile">
                    <div className="container-fluid">
                        <div className="row profile-row">
                            <div className="col-md-6 col-sm-6 col-sm-6 profile-col">
                                <h5 className="info-title">Experience</h5>
                                <p>{this.state.user.experience} / {this.state.user.nextLevelExperience}</p>
                                <div className="spacing">
                                    <Experience user={this.state.user}/>
                                </div>
                            </div>
                            <div className="col-md-6 col-sm-6 profile-col">
                                <h5 className="info-title">Level</h5>
                                <p>{this.state.user.level}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="favorite-quote container-fluid">
                    <div className="title-container">
                        <h2 className="styled-title">{this.state.user.username}'s favorites quotes</h2>
                    </div>

                    <div className="row">
                        {this.state.userFavorite.map(song => {
                            return(
                                <div className="col-md-4 col-lg-3">
                                    <SoundComponent className="card">
                                        <Sounds userInfo={this.state.userInfo} handleCallout={this.handleCallout} img={song.imageUrl} index={song.id} title={song.title} soundFile={song.url}/>
                                    </SoundComponent>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </UserProfile>
                </>
        )
    }

};

const UserProfile = styled.div`
    .spacing {
    margin: 2em 2em 0;
    
    @media screen and (max-width: 600px) {
            margin: 0 2em;
        }
    }
.top-profile {
position:relative;
background: linear-gradient(90deg, rgba(189,57,65,1) 0%, rgba(186,41,65,1) 100%);
padding: 5em;

    &:after {
        content:"";
        position:absolute;
        left:50%;
        bottom: -38px;
        display: block;
        background-color: #fff;
        height:30px
        width:30px;
        transform: rotate(45deg) translate(-80%,-8%);
    
    }
    
    .user {
    margin: 0 auto;
    text-align:center;
    color: #fff;
    
    .img {
    height:10em;
    width:10em;
        text-align:center;
        img {
             width: 100%;
             height: 100%;
            border-radius: 50%;
            }
        }
    
    }
    .profile-name {
        color: #fff;
        text-align:center;
    }
}

.mid-profile {
    .profile-col {
       text-align:center;
       padding:7em 0;
       margin: 2em 0;
       border-right: 1px solid red;
       color:rgba(189,57,65,1);
       
           @media screen and (max-width: 600px) {
            border: 0;
        }
       
       .info-title {
       
       }
       
       &:last-child {
            border-right:0;
       }
    }
}
`;

const SoundComponent = styled.div`
background-color:#fff;
transition:all ease-in .3s;


&:hover {
box-shadow: 1px 4px 13px 3px rgba(0,0,0,0.2);
}
`;

export default  UserDetail;