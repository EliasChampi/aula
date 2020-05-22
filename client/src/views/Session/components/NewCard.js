import React from "react";
import PropTypes from "prop-types";
import ActivityCard from "./ActivityCard";
import {
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  List,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/FolderRounded";

function NewCard({ activity, handleCaliClick }) {
  const Item = (label, title) => (
    <ListItem>
      <ListItemIcon>
        <FolderIcon />
      </ListItemIcon>
      <ListItemText primary={label} secondary={title} />
    </ListItem>
  );
  return (
    <ActivityCard
      activity={activity}
      foot={
        <Button color="secondary" onClick={handleCaliClick}>
          Desarrollar Actividad
        </Button>
      }
    >
      <List dense>
        {Item("Curso", activity.unit.Operatives[0].course.name)}
        {Item("Docente", activity.unit.Operatives[0].teacher.name)}
        {Item("Unidad de Aprendizaje", activity.unit.name)}
      </List>
    </ActivityCard>
  );
}

NewCard.propTypes = {
  activity: PropTypes.object.isRequired,
  handleCaliClick: PropTypes.func.isRequired,
};

export default NewCard;
