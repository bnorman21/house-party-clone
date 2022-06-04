import {
  Card,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from "@mui/material";
import { PauseCircle, PlayCircle, SkipNext } from "@mui/icons-material";

function MusicPlayer(props) {
  const songProgress = (props.time / props.duration) * 100;
  return (
    <Card>
      <Grid container alignItems="center">
        <Grid item align="center" xs={4}>
          <img
            src={props.image_url}
            height="100%"
            width="100%"
            alt="song image"
          />
        </Grid>
        <Grid item align="center" xs={8}>
          <Typography component="h5" variant="h5">
            {props.title}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            {props.artist}
          </Typography>
          <div>
            <IconButton>
              {props.isPlaying ? <PauseCircle /> : <PlayCircle />}
            </IconButton>
            <IconButton>
              <SkipNext />
            </IconButton>
          </div>
        </Grid>
      </Grid>
      <LinearProgress variant="determinate" value={songProgress} />
    </Card>
  );
}

export default MusicPlayer;
