import React, {Component} from 'react';
import {Navbar} from 'react-bootstrap';

import Logo from './logo';

class Header extends Component {
    render() {
        return (
            <Navbar inverse={true}
                    fluid={true}>
                <Navbar.Header>

                    <Navbar.Brand>
                        <Logo />
                    </Navbar.Brand>

                    <Navbar.Toggle/>
                </Navbar.Header>
            </Navbar>
        )
    }
}

export default Header;