import React from "react";
import PropTypes from "prop-types";
import BorderColor from "@material-ui/icons/BorderColor";
import DescriptionIcon from "@material-ui/icons/Description";
import { pink } from '@material-ui/core/colors';
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles(theme => ({
  pink: {
    color: theme.palette.getContrastText(pink[500]),
    backgroundColor: pink[500]
  }
}));
const NewItems = props => {
  const { primaryText, secondaryText } = props;
  const classes = useStyles();
  return (
    <React.Fragment>
      <ListItem>
        <ListItemAvatar>
          <Avatar className={classes.pink}>
            <DescriptionIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={primaryText} secondary={secondaryText} />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="edit">
            <BorderColor />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      <Divider variant="inset" component="li" />
    </React.Fragment>
  );
};

NewItems.propTypes = {
  primaryText: PropTypes.string.isRequired,
  secondaryText: PropTypes.string.isRequired
};

export default NewItems;
