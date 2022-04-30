import React, { Component } from "react";
import { render } from "react-dom";
import HomePage from './HomePage';
import RoomJoinPage from './RoomJoinPage'
import CreateRoomPage from "./CreateRoomPage"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

export default class App extends Component {
    //components can render other components
    constructor(props) {
        super(props);
        //remember whenever state is modified it will re-render component
    }

    render() {
        return (
            <Router>
                <Switch>
                   <Route exact path="/" component={HomePage} />
                    <Route path="/join" component={RoomJoinPage} />
                    <Route path="/create" component={CreateRoomPage} />
                </Switch>
            </Router>

        );

    }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);