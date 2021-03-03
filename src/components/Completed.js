import React, { Component, Fragment } from 'react';

import NavBar from "./NavBar.js";
import Body from "./Completed/Body.js";

class Completed extends Component {
    render() {
        return (
            <Fragment>
                <NavBar header="Completed Todos" href='/' link='Back to Todo List'/>
                <Body history={this.props.history}/>
            </Fragment>
        )
    }
}

export default Completed;
