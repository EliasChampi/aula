import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  Collapse,
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { orange } from "@material-ui/core/colors";
import FolderSharedIcon from "@material-ui/icons/FolderSharedRounded";
import { state, cycleTypes } from "common/decorator";
import { IMAGE } from "constants/global";
const useStyles = makeStyles(() => ({
  cardMedia: {
    borderRadius: "50%",
    width: "100px",
    margin: "auto",
  },
  card: {
    borderTop: "5px solid " + orange[500],
  },
  CardContent: {
    textAlign: "center",
  },
}));
const StudentCard = ({
  student,
  regs,
  selected,
  handleExpandedClick,
  handleGo,
}) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        component="img"
        image={IMAGE("student", student.image)}
        title="Foto del estudiante"
        alt="Foto del estudiante"
      />
      <CardContent className={classes.CardContent}>
        <Typography variant="h4">{student.fullname}</Typography>
        <Typography variant="subtitle2">DNI: {student.dni}</Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button disabled>Ver Perfil</Button>
        <Button
          color="secondary"
          aria-expanded={selected === student.dni}
          onClick={handleExpandedClick}
        >
          Matriculas
        </Button>
      </CardActions>
      <Collapse in={selected === student.dni} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <Typography variant="subtitle2" component="i">
            Seleccione para ver sus actividades
          </Typography>
          <List>
            {regs.map((item) => (
              <ListItem
                button
                key={item.code}
                onClick={() => handleGo(item, student)}
              >
                <ListItemIcon>
                  <FolderSharedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${item.section_code.substr(-2)} de 
                  ${cycleTypes[item.section_code.substr(4, 3)]} 
                  ${item.section_code.substr(0, 4)}`}
                  secondary={state[item.state]}
                />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Collapse>
    </Card>
  );
};

StudentCard.propTypes = {
  student: PropTypes.object.isRequired,
  selected: PropTypes.string.isRequired,
  handleExpandedClick: PropTypes.func.isRequired,
  handleGo: PropTypes.func.isRequired,
  regs: PropTypes.array,
};

export default StudentCard;
