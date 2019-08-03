import React from 'react'
import {LoginWrapper} from '../styledComponents/LoginWrapper'
import {Link} from "react-router-dom";
import * as firebase from "firebase";
import {FaArrowLeft} from "react-icons/fa";

class Signup extends React.Component{

    state = {
        username: "",
        password: "",
        email: "",
        users:[],
        image: null,
        url:"",
        message: "",
        level:1,
        userNameUsed:false,
        experience:0,
        nextLevelExperience: 200
    };

    handleChange = (e, state) => {
        this.setState({[state]:e.target.value})
        this.setState({userNameUsed:false})
    };

    componentDidMount() {
        const ref = firebase.database().ref('/users');

        ref.on('value', snap => {
            let resp = [];
            if(snap.val() !== null) {
                resp = Object.values(snap.val())
            } else {
                resp = []
            }
            this.setState({users : resp || []})
        })
    }

    signUp = e => {
        e.preventDefault();
        const username = this.state.users.filter(user=>{
            return user.username === this.state.username;
        })
        if(username.length === 0) {
            this.setState({userNameUsed:false})
        }else {
            this.setState({userNameUsed:true, message: "this username is already used"});
            return;
        }

            firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
                .then((user)=>{
                    firebase.database().ref('users/' + user.user.uid).set({email:this.state.email, password:this.state.password,username: this.state.username, level:this.state.level, experience:this.state.experience, nextLevelExperience: this.state.nextLevelExperience, uid:user.user.uid})
                })
                .catch(({message}) => {
                    this.setState({message:message})
                });
            if(this.state.username.trim() !== "" && this.state.email.trim() !== '' && this.state.password.trim() !== '') {
                this.props.history.push('/');
            }

    };

    render(){
        return(
            <LoginWrapper className="wrapper fadeInDown">
                <div id="formContent">
                    <Link to="/"><FaArrowLeft className="back-arrow"/></Link>
                    <form onSubmit={this.signUp}>
                        <input onChange={(e) => this.handleChange(e , "username")} type="text" name="username" placeholder="username" />
                        <input onChange={(e) => this.handleChange(e , "email")} type="text" id="login" className="fadeIn second" name="login" placeholder="login" />
                        <input onChange={(e) => this.handleChange(e , "password")} type="password" id="password" className="fadeIn third" name="login"
                               placeholder="password" />
                        {/*  <div>Upload Your File </div>
                        <input onChange={(e) => this.handleUploadChange(e)} type="file" className="fadeIn third" multiple="" />*/}
                            <input type="submit" disabled={this.state.userNameUsed} className="fadeIn fourth login-btn" value="signup" />

                    </form>
                    {this.state.message}
                </div>
            </LoginWrapper>
        )
    }
}

export default Signup