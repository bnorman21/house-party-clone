import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";

function Room(props) {
  const [votesToSkip, setVotesToSkip] = useState(2);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);
  const [loading, setLoading] = useState(true);

  let { roomCode } = useParams();

  //goal for this to run when component mounts
  useEffect(() => {
    fetch("/api/get-room" + "?code=" + roomCode)
      .then((response) => response.json())
      .then((data) => {
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause);
        setIsHost(data.is_host);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="center">
        <CircularProgress />
      </div>
    );
  } else {
    return (
      <div className="center">
        <h3>{roomCode}</h3>
        <p>Votes: {votesToSkip}</p>
        <p>Guest Can Pause: {guestCanPause ? "true" : "false"}</p>
        <p>Host: {isHost ? "true" : "false"}</p>
      </div>
    );
  }
}

export default Room;
