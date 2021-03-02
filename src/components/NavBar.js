import React, { Component } from 'react';
import { Nav, NavLink } from 'reactstrap';

class NavBar extends Component {
    render() {
        return (
            <Nav className="navbar navbar-dark bg-dark justify-content-between">
                <NavLink className="navbar-brand">React Redux Todo List</NavLink>
            </Nav>
        )
    }
}

export default NavBar;
