import React from 'react';
import {NavLink} from 'react-router-dom';

const SignedInLink= () => {
    return (
        <ul className="right">
            <li><NavLink to="/create">New Post</NavLink></li>
            <li><NavLink to="/">Sign Out</NavLink></li>
            <li><NavLink to="/" className="btn btn-floating pink lighten-1">KM</NavLink></li>

        </ul>
    )
}

export default SignedInLink;