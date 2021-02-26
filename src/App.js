import React, { Component, Fragment } from "react";
import { 
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";

import Home from "./components/Home.js";

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Switch>
            <Route path="/" component={Home} exact/>
          </Switch>
        </Fragment>
      </Router>
    );
  }
}

export default App;
