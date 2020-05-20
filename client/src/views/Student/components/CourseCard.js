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

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: "250px",
    margin: "auto",
  },
}));

function CourseCard({ code, teacher, course }) {
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
        <Typography variant="h4">{course.name}</Typography>
        <Typography variant="subtitle1">Docente: {teacher.fullname}</Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="secondary">Actividades</Button>
      </CardActions>
    </Card>
  );
}

CourseCard.propTypes = {
  code: PropTypes.number.isRequired,
  teacher: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};

export default CourseCard;
