import React, { Component, Fragment } from 'react';

import NavBar from "./NavBar.js";
import ListBody from "./List/Body.js";

class List extends Component {
    render() {
        return (
            <Fragment>
                <NavBar/>
                <ListBody history={this.props.history}/>
            </Fragment>
        )
    }
}

export default List;
