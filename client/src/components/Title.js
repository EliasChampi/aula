import React from "react";
import PropTypes from "prop-types";
import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
}));
const Title = ({ title }) => {
  const classes = useStyles();
  return (
    <div className={classes.margin}>
      <Typography variant="h5" color="textSecondary">
        {title}
      </Typography>
      <Divider />
    </div>
  );
};

Title.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Title;
