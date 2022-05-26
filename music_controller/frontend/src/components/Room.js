import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, CircularProgress, Grid, Typography } from "@mui/material";

function Room(props) {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [loading, setLoading] = useState(true);

  let { roomCode } = useParams();
  let navigate = useNavigate();

  //to run when component mounts
  useEffect(() => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => response.json())
      .then((data) => {
        if ("Room Not Found" in data) {
          navigate("/");
        }
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
        setLoading(false);
      });
  }, []);

  const leaveButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/leave-room", requestOptions).then((response) => {
      navigate("/");
    });
  };

  if (loading) {
    return (
      <div className="center">
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className="center">
        <Grid container spacing={1}>
          <Grid item xs={12} align="center">
            <Typography variant="h4" component="h4">
              Code: {roomCode}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6" component="h6">
              Votes: {votesToSkip}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6" component="h6">
              Code: {roomCode}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Typography variant="h6" component="h6">
              Host: {isHost.toString()}
            </Typography>
          </Grid>
          <Grid item xs={12} align="center">
            <Button
              variant="contained"
              color="secondary"
              onClick={leaveButtonPressed}
            >
              Leave Room
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Room;
