import React from "react";
import { Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  box: {
    background: theme.palette.background.default,
  },
  img: {
    width: "100%",
  },
}));

const About = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.box}>
      <img className={classes.img} src="/images/about.svg" />
    </Paper>
  );
};

export default About;
