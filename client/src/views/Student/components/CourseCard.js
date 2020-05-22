import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Divider,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  card: {
    maxWidth: "250px",
    margin: "auto",
  },
}));

function CourseCard({ item, onActivityClick }) {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        height={150}
        component="img"
        src="/images/libros.svg"
        title="Curso"
        alt="Foto de Curso"
      />
      <CardContent>
        <Typography variant="h4">{item.course.name}</Typography>
        <Typography variant="subtitle1">
          Docente: {item.teacher.fullname}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="secondary" onClick={() => onActivityClick(item)}>
          Actividades
        </Button>
      </CardActions>
    </Card>
  );
}

CourseCard.propTypes = {
  onActivityClick: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

export default CourseCard;
