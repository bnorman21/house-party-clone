import React, { useState } from "react";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const pages = {
  JOIN: "pages.join",
  CREATE: "pages.create",
};

function Info(props) {
  const [page, setPage] = useState(pages.JOIN);

  function joinInfo() {
    return "Join page";
  }

  function createInfo() {
    return "Create page";
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography component="h4" variant="h4">
          What is House Party?
        </Typography>
      </Grid>
      <Grid items xs={12} align="center">
        <Typography variant="body1">
          {page === pages.JOIN ? joinInfo() : createInfo()}
        </Typography>
      </Grid>
      <Grid items xs={12} align="center">
        <IconButton
          onClick={() => {
            page === pages.CREATE ? setPage(pages.JOIN) : setPage(pages.CREATE);
          }}
        >
          {page === pages.CREATE ? (
            <NavigateBeforeIcon />
          ) : (
            <NavigateNextIcon />
          )}
        </IconButton>
      </Grid>
      <Grid item xs={12} align="center">
        <Button color="secondary" variant="contained" href="/">
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

export default Info;
