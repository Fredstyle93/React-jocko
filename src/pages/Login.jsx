import React from "react";
import styled from 'styled-components';
import * as firebase from 'firebase'
import {Link} from "react-router-dom";
import {LoginWrapper} from '../styledComponents/LoginWrapper'

class Login extends React.Component {

    state = {
        email: "",
        password: "",
        message: ""
    }

    login = e => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
            .then(()=>{
                console.log('success');
            })
            .catch(({message}) => {
                this.setState({message:message})
            })
    };

    forgotPassword = () => {

    }

    handleChange = (e, state) => {

        this.setState({[state]:e.target.value})
    };


    render(){
        return(
            <LoginWrapper className="wrapper fadeInDown">
                <div id="formContent">

                    <form>
                        <input onChange={(e) => this.handleChange(e , "email")} type="text" id="login" className="fadeIn second" name="login" placeholder="login" />
                        <input onChange={(e) => this.handleChange(e , "password")} type="password" id="password" className="fadeIn third" name="login"
                               placeholder="password" />
                        <input onClick={this.login} type="submit" className="fadeIn fourth" value="Log In" />
                        <Link to="/signup">
                            <input type="submit" className="fadeIn fourth" value="signup" />
                        </Link>
                    </form>
                    {this.state.message}
                    <div id="formFooter">
                        <Link to="/forgot-password">
                        <span className="underlineHover" href="#">Forgot Password?</span>
                        </Link>
                    </div>
                </div>
            </LoginWrapper>
        )
    }
};
export default Login;