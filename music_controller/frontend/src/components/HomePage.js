import { useState } from "react";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import {
  Switch,
  Route,
  Redirect,
} from "react-router";


function HomePage (props) {


    return (
        <Switch>
            <Route exact path="/">
                <p>This is the home page</p>
            </Route>
            <Route path="/join">
                <RoomJoinPage />
            </Route>
            <Route path="/create">
                <CreateRoomPage />
            </Route>
        </Switch>
    );

}

export default HomePage;