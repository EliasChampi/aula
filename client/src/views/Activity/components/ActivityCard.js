import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  CardHeader,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { orange } from "@material-ui/core/colors";
import FolderIcon from "@material-ui/icons/FolderRounded";
import { yourdate, activityType } from "common/decorator";
const useStyles = makeStyles(() => ({
  card: {
    borderTop: "5px solid " + orange[500],
  },
  CardContent: {
    textAlign: "center",
  },
}));
const ActivityCard = ({ activity, handleCaliClick }) => {
  const classes = useStyles();
  const Item = (label, title) => (
    <ListItem>
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText primary={label} secondary={title} />
    </ListItem>
  );

  return (
    <Card className={classes.card}>
      <CardHeader
        title={activityType[activity.type]}
        subheader={`Para ${yourdate(activity.to_date)}`}
      />
      <CardMedia
        height={120}
        component="img"
        image="/images/cardbg2.svg"
        title="Actividad"
        alt="Back"
      />
      <CardContent className={classes.CardContent}>
        <Typography variant="h4">{activity.title}</Typography>
        <List dense>
          {Item("Curso", activity.unit.Operatives[0].course.name)}
          {Item("Docente", activity.unit.Operatives[0].teacher.name)}
          {Item("Unidad", activity.unit.name)}
        </List>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" onClick={handleCaliClick}>
          Desarrollar Actividad
        </Button>
      </CardActions>
    </Card>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.object.isRequired,
  handleCaliClick: PropTypes.func,
};

export default ActivityCard;
