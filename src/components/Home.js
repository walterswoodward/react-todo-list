import React, { Component, Fragment } from 'react';

import NavBar from "./NavBar.js";
import HomeBody from "./Home/Body.js";

class Home extends Component {
    render() {
        return (
            <Fragment>
                <NavBar/>
                <HomeBody history={this.props.history}/>
            </Fragment>
        )
    }
}

export default Home;
