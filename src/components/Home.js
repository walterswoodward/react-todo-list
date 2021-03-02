import React, { Component, Fragment } from 'react';

import NavBar from "./NavBar.js";
import TodosList from "./TodosList.js";

class Home extends Component {
    render() {
        return (
            <Fragment>
                <NavBar/>
                <TodosList/>
            </Fragment>
        )
    }
}

export default Home;
