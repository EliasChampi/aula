import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Divider,
  CardHeader,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { orange } from "@material-ui/core/colors";
import { yourdate, activityType } from "common/decorator";
const useStyles = makeStyles(() => ({
  card: {
    borderTop: "5px solid " + orange[500],
  },
  CardContent: {
    textAlign: "center",
  },
}));
const ActivityCard = ({ activity, foot, children }) => {
  const classes = useStyles();

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
        <Typography variant="subtitle2">{`Creado el: ${yourdate(
          activity.created_at,
          "[a las] hh:mm a"
        )}`}</Typography>
        {children}
      </CardContent>
      <Divider />
      <CardActions>{foot}</CardActions>
    </Card>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.object.isRequired,
  foot: PropTypes.any.isRequired,
  children: PropTypes.any,
};

export default ActivityCard;
