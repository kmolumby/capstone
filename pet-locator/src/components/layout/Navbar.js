import React from 'react';
import {Link} from 'react-router-dom';
import SignedInLink from './SignedInLink';
import SignedOutLink from './SignedOutLink';

const Navbar = () => {
    return (

        <nav className="nav-wrapper darken-3 grey">    
            <div className="container">
                <Link to='/' className="brand-logo"> Pet Locator</Link>
                <SignedInLink />
                <SignedOutLink />
            </div>
        </nav> 
    )
}

export default Navbar;