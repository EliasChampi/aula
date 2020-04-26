import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Divider,
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
const CourseCard = ({ course, handleAction }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        height={120}
        component="img"
        image={`/images/cardbg1.svg`}
        title="Curso"
        alt="Foto de Curso"
      />
      <CardContent className={classes.CardContent}>
        <Typography variant="h4">
          {`${
            course.section.degree.cycle.branch.name
          } - ${course.section.code.substr(-2)} de ${
            course.section.degree.cycle.title
          }`}
        </Typography>
        <Typography variant="subtitle2">{course.course.name}</Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          onClick={() => handleAction("/estudiantes", course)}
        >
          Estudiantes
        </Button>
        <Button
          color="primary"
          onClick={() => handleAction("/unidades", course)}
        >
          Unidades
        </Button>
      </CardActions>
    </Card>
  );
};

CourseCard.propTypes = {
  course: PropTypes.object.isRequired,
  handleAction: PropTypes.func,
};

export default CourseCard;
