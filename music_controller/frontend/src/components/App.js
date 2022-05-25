import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";

function App() {
  return <div className="center">This is the home page</div>;
}

const container = document.getElementById("app");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="create" element={<CreateRoomPage />} />
        <Route path="join" element={<RoomJoinPage />} />
        <Route path="/room/:roomCode" element={<Room />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

export default App;
