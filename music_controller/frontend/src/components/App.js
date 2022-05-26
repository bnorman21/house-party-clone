import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { createRoot } from "react-dom/client";
import RoomJoinPage from "./RoomJoinPage";
import CreateRoomPage from "./CreateRoomPage";
import Room from "./Room";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";

function App() {
  const [roomCode, setRoomCode] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
        setLoading(false);
      });
  }, []);

  const checkRoomCode = () => {
    setLoading(true);
    fetch("/api/user-in-room")
      .then((response) => response.json())
      .then((data) => {
        setRoomCode(data.code);
        setLoading(false);
      });
  };

  if (loading) {
    return (
      <div className="center">
        <CircularProgress />
      </div>
    );
  } else if (roomCode === null) {
    return (
      <div className="center">
        <Grid container spacing={3}>
          <Grid item xs={12} align="center">
            <Typography variant="h3" compact="h3">
              House Party
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <ButtonGroup disableElevation variant="contained" color="primary">
              <Button color="primary" href="/join">
                Join a Room
              </Button>
              <Button color="secondary" href="/create">
                Create a Room
              </Button>
            </ButtonGroup>
          </Grid>
        </Grid>
      </div>
    );
  } else {
    return <Navigate to={`/room/${roomCode}`} />;
  }
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
