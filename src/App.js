import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home.js";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: this.props.todos,
        };
    }
    render() {
        return (
            <Router>
            <Switch>
                <Route path="/" component={Home} exact/>
            </Switch>
            </Router>
        );
    }
}

export default App;
