import React, { Component, Fragment } from 'react';

import NavBar from "./NavBar.js";
import Body from "./Home/Body.js";

class Home extends Component {
    render() {
        return (
            <Fragment>
                <NavBar header="React Redux Todo List" href='/completed' link='View Completed'/>
                <Body history={this.props.history}/>
            </Fragment>
        )
    }
}

export default Home;
