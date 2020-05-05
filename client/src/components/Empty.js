import React from "react";
import PropTypes from "prop-types";
import BathtubIcon from "@material-ui/icons/Bathtub";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  wrap: {
    textAlign: "center",
    margin: "auto",
    padding: theme.spacing(2),
  },
  icon: {
    fontSize: 50,
  },
}));
function Empty({ title }) {
  const classes = useStyles();
  return (
    <div className={classes.wrap}>
      <BathtubIcon color="disabled" className={classes.icon} />
      <Typography variant="subtitle2">{title}</Typography>
    </div>
  );
}

Empty.propTypes = {
  title: PropTypes.string,
};

export default Empty;
