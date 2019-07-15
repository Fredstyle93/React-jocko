import React from 'react';
import {Link} from "react-router-dom";

const Nav = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <a className="navbar-brand" href="#">Jocko</a>


                <div className=" navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to="/" className="nav-link" href="#">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/quote" className="nav-link" href="#">My quote</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
};

export default Nav;