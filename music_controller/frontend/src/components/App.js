import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import { createRoot } from "react-dom/client";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

function App() {
    return (
        <div>
            <p>This is the home page</p>
        </div>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);
root.render(
    <React.StrictMode>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={ <App /> }>
            </Route>
            <Route path="create" element={ <CreateRoomPage />}>
            </Route>
            <Route path="join" element={<RoomJoinPage /> }>
            </Route>
        </Routes>
    </BrowserRouter>
    </React.StrictMode>
);


export default App;