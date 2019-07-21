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
        message: ""
    };

    handleChange = (e, state) => {
        this.setState({[state]:e.target.value})
    };

    signUp = e => {
        console.log(this.state);
        e.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
            .then((user)=>{
                console.log(this.state.username)
                console.log(user.user.uid)
                firebase.database().ref('users/' + user.user.uid).set({email:this.state.email, password:this.state.password,username: this.state.username})

            })
            .catch(({message}) => {
                this.setState({message:message})
            })
        this.props.history.push('/');
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
                            <input type="submit" className="fadeIn fourth" value="signup" />

                    </form>
                    {this.state.message}
                </div>
            </LoginWrapper>
        )
    }
}

export default Signup