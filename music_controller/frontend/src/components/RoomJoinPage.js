import { Button, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RoomJoinPage(props) {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");
  let navigate = useNavigate();

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
  };

  const roomButtonPressed = () => {
    //need to check with backend if the room exists
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json " },
      body: JSON.stringify({
        code: roomCode,
      }),
    };
    fetch("/api/join-room", requestOptions)
      .then((response) => {
        if (response.ok) {
          navigate(`/room/${roomCode}`);
        } else {
          setError("Room not found");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="center">
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Typography variant="h4" componet="h4">
            Join a Room
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <TextField
            error={error}
            label="code"
            placeholder="Enter a Room Code"
            value={roomCode}
            helperText={error}
            variant="outlined"
            onChange={handleTextFieldChange}
          >
            Join a Room
          </TextField>
        </Grid>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={roomButtonPressed}
          >
            Enter Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" href="/" variant="contained">
            Back
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default RoomJoinPage;
