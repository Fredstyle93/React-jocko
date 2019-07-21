import React from 'react'
import * as firebase from 'firebase'
import {FaSmile} from "react-icons/fa";

class Callout extends React.Component {

    render(){
        return(
            <div className={"alert alert-light custom-alert " + this.props.isVisible}  role="alert">
                <div>
                    <h5>Tu as monté de niveau ! <span><FaSmile className="level-icon"/></span></h5>
                    <p> tu es maintenant niveau {this.props.userInfo !== undefined ? this.props.userInfo[2] : ""}</p>
                </div>

            </div>
        )
    }
}

export default Callout;