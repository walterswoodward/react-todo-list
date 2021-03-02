import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import List from "./components/List.js";

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
                <Route path="/" component={List} exact/>
            </Switch>
            </Router>
        );
    }
}

export default App;
