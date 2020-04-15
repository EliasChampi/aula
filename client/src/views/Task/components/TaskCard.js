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
import { yourdate, taskType } from "common/decorator";
const useStyles = makeStyles(() => ({
  card: {
    borderTop: "5px solid " + orange[500],
  },
  CardContent: {
    textAlign: "center",
  },
}));
const TaskCard = ({ task, handleCaliClick }) => {
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
        title={taskType[task.type]}
        subheader={`Para ${yourdate(task.to_date)}`}
      />
      <CardMedia
        height={120}
        component="img"
        image={`/images/back.png`}
        title="Tarea"
        alt="Back de Tarea"
      />
      <CardContent className={classes.CardContent}>
        <Typography variant="h4">{task.title}</Typography>
        <List dense>
          {Item("Curso", task.learn.Operatives[0].course.name)}
          {Item("Docente", task.learn.Operatives[0].teacher.name)}
          {Item("Unidad", task.learn.name)}
        </List>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary" onClick={handleCaliClick}>
          Desarrollar Tarea
        </Button>
      </CardActions>
    </Card>
  );
};

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  handleCaliClick: PropTypes.func,
};

export default TaskCard;
