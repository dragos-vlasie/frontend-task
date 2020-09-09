import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";

import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    border: "1px solid #f5f4f2",
    padding: "0 18px",
  },
  header: {
    boxShadow: "none",
  },
  headerWrapper: {
    boxShadow: "none",
    borderBottom: "1px solid #f5f4f2",
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar color="transparent" className={classes.header} position="static">
        <Toolbar className={classes.headerWrapper}>
          <Typography variant="h6" className={classes.title}>
            Task
          </Typography>
        </Toolbar>
        <main className={classes.layout}>
          <Typography variant="h4" align="center" style={{ marginTop: 80, color: "#4fb1a3" }}>
            Registration form
          </Typography>
          <Typography variant="subtitle2" align="center" style={{ marginTop: 10, marginBottom: 10 }}>
            This is some registration form
          </Typography>
          <Paper className={classes.paper}>Stepform</Paper>
          <Divider style={{ marginTop: 100 }} />
        </main>
      </AppBar>
    </div>
  );
}
