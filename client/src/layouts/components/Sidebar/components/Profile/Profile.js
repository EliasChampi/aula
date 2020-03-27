import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";
import { AuthContext } from "context/auth";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content"
  },
  avatar: {
    width: 60,
    height: 60
  }
}));

const Profile = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { user } = useContext(AuthContext);
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={"/images/" + user.image}
        to="/mis-datos"
      />
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="h5">{user.surname}</Typography>
      <Typography variant="subtitle2">{user.mode}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
