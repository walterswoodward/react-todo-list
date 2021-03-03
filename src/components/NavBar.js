import React, { Component } from 'react';
import { Label, Nav, Button } from 'reactstrap';

class NavBar extends Component {
    render() {
        return (
            <Nav className="navbar navbar-dark bg-dark justify-content-between">
                <div className="navbar-brand">{this.props.header}</div>
                <Button href={this.props.href} className="btn btn-outline-light">{this.props.link}</Button>
            </Nav>
        )
    }
}

export default NavBar;
