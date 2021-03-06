import React, { useContext } from "react";
import { Link as RouterLink } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Typography } from "@material-ui/core";

import { AuthContext } from "context/auth";
import { IMAGE } from "constants/global";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "fit-content",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  upper: {
    textTransform: "uppercase",
  },
}));

const Profile = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  const { user } = useContext(AuthContext);
  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={IMAGE("default", user.image)}
        to="/mis-datos"
      />
      <Typography variant="h4">{user.name}</Typography>
      <Typography variant="subtitle2" className={classes.upper}>
        {user.mode}
      </Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
};

export default Profile;
