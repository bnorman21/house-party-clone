import {
  Alert,
  Button,
  Collapse,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

let defaultVotes = 2;

function CreateRoomPage(props) {
  const [guestCanPause, setGuestCanPause] = useState(props.guestCanPause);
  const [votesToSkip, setVotesToSkip] = useState(props.votesToSkip);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  let navigate = useNavigate();

  const handleVotesChange = (e) => {
    setVotesToSkip(e.target.value);
  };

  const handleGuestCanPauseChange = (e) => {
    let canPause = e.target.value === "true";
    setGuestCanPause(canPause);
  };

  const handleRoomButtonPressed = () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
      }),
    };
    fetch("/api/create-room", requestOptions)
      .then((response) => response.json())
      .then((data) => navigate("/room/" + data.code));
  };

  const handleUpdateButtonPressed = () => {
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        votes_to_skip: votesToSkip,
        guest_can_pause: guestCanPause,
        code: props.roomCode,
      }),
    };
    fetch("/api/update-room", requestOptions).then((response) => {
      if (response.ok) {
        setSuccessMsg("Room updated successfully!");
      } else {
        setErrorMsg("Error updating room...");
      }
      props.updateCallback();
    });
  };

  const renderCreateButtons = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={handleRoomButtonPressed}
          >
            Create A Room
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" href="/" variant="contained">
            Back
          </Button>
        </Grid>
      </Grid>
    );
  };

  const renderUpdateButton = () => {
    return (
      <Grid item xs={12} align="center">
        <Button
          color="primary"
          variant="contained"
          onClick={handleUpdateButtonPressed}
        >
          Update Room
        </Button>
      </Grid>
    );
  };

  const renderAlertMessage = () => {
    if (successMsg !== "" && errorMsg === "") {
      return (
        <Alert severity="success" onClose={() => setSuccessMsg("")}>
          {successMsg}
        </Alert>
      );
    } else if (errorMsg !== "" && successMsg === "") {
      return (
        <Alert severity="error" onClick={() => setErrorMsg("")}>
          {errorMsg}
        </Alert>
      );
    }
  };
  //TODO: This component is changing the default value state of an
  // uncontrolled RadioGroup after being initialized. To suppress this
  // warning opt to use a controlled RadioGroup.

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Collapse in={errorMsg !== "" || successMsg !== ""}>
          {renderAlertMessage()}
        </Collapse>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          {props.update ? "Update Room" : "Create a Room"}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl component="fieldset">
          <FormHelperText>Guest Control of Playback State</FormHelperText>
          <RadioGroup
            row
            defaultValue={props.guestCanPause}
            onChange={handleGuestCanPauseChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio color="primary" />}
              label="Play/Pause"
              labelPlacement="bottom"
            />
            <FormControlLabel
              value="false"
              control={<Radio color="secondary" />}
              label="No Control"
              labelPlacement="bottom"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
      <Grid item xs={12} align="center">
        <FormControl>
          <TextField
            required={true}
            type="number"
            onChange={handleVotesChange}
            defaultValue={votesToSkip}
            inputProps={{ min: 1, style: { textAlign: "center" } }}
          />
          <FormHelperText>Votes Required to Skip Song</FormHelperText>
        </FormControl>
      </Grid>
      {props.update ? renderUpdateButton() : renderCreateButtons()}
    </Grid>
  );
}

CreateRoomPage.defaultProps = {
  votesToSkip: 2,
  guestCanPause: false,
  update: false,
  roomCode: null,
  updateCallback: () => {},
};

export default CreateRoomPage;
