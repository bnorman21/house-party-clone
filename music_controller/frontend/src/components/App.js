import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";

function App() {
  return <div>This is the home page</div>;
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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

export default App;
