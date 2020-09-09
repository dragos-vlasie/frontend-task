import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Typography, Toolbar, AppBar } from "@material-ui/core";
import StepForm from "./Components/StepForm";

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
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
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
          <Typography variant="h4" align="center" style={{ marginTop: 80 }}>
            Registration Form
          </Typography>
          <Typography variant="subtitle2" align="center" style={{ marginTop: 10, marginBottom: 10 }}>
            This is a registration form.
          </Typography>
          <Paper className={classes.paper}>
            <StepForm />
          </Paper>
        </main>
      </AppBar>
    </div>
  );
}
