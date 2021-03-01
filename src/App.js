import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import TodosList from "./components/TodosList.js";

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
                <Route path="/" component={TodosList} exact/>
            </Switch>
            </Router>
        );
    }
}

export default App;
