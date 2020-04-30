import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { orange } from "@material-ui/core/colors";
const useStyles = makeStyles(() => ({
  card: {
    borderTop: "5px solid " + orange[500],
  },
  CardContent: {
    textAlign: "center",
  },
}));
const NewCard = ({ title, to_date, handleEdit, handleCaliClick }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        height={120}
        component="img"
        image="/images/cardbg2.svg"
        title="Actividad"
        alt="Back"
      />
      <CardContent className={classes.CardContent}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="subtitle2">{to_date}</Typography>
      </CardContent>
      <CardActions>
        <Button color="primary" onClick={handleEdit}>
          Modificar
        </Button>
        <Button color="primary" onClick={handleCaliClick}>
          Revisar
        </Button>
      </CardActions>
    </Card>
  );
};

NewCard.propTypes = {
  title: PropTypes.string.isRequired,
  to_date: PropTypes.string.isRequired,
  handleEdit: PropTypes.func,
  handleCaliClick: PropTypes.func,
};

export default NewCard;
