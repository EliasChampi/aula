import React from "react";
import PropTypes from "prop-types";
import CreateIcon from "@material-ui/icons/Create";
import { pink } from "@material-ui/core/colors";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500],
    cursor: "pointer",
  },
}));
const NewItems = (props) => {
  const { primaryText, secondaryText, handleEdit } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.pink} onClick={handleEdit}>
            <CreateIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={primaryText} secondary={secondaryText} />
        <ListItemSecondaryAction>
          <Button edge="end" variant="contained" color="primary">
            Calificaciones
          </Button>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
};

NewItems.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired,
  handleEdit: PropTypes.func,
};

export default NewItems;
