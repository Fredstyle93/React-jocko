import React from 'react'
import {LoginWrapper} from '../styledComponents/LoginWrapper'
import {Link} from "react-router-dom";
import * as firebase from "firebase";
import {FaArrowLeft} from "react-icons/fa";

class ForgotPassword extends React.Component{

    state = {
        email: "",
        message: ""
    };

    handleChange = (e, state) => {
        this.setState({[state]:e.target.value})
    };

    forgotPassword = e => {
        e.preventDefault();
        firebase.auth().sendPasswordResetEmail(this.state.email)
            .then(()=> {
                this.setState({message: "Regardez votre boite de messagerie"})
            })
            .catch(({message})=> {
                this.setState({message: message})
            })
    };

    render(){
        return(
            <LoginWrapper className="wrapper fadeInDown">
                <div id="formContent">
                    <Link to="/"><FaArrowLeft className="back-arrow"/></Link>
                <h3>Entrez votre courriel</h3>
                    <form onSubmit={this.forgotPassword}>
                        <input onChange={(e) => this.handleChange(e , "email")} type="text" id="login" className="fadeIn second" name="login" placeholder="Courriel" />
                        <input type="submit" className="fadeIn fourth" value="Reset password" />

                    </form>

                    {this.state.message}
                </div>
            </LoginWrapper>
        )
    }
}

export default ForgotPassword