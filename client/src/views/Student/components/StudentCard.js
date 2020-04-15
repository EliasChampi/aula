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
import { state } from "common/decorator";
import { Link } from "react-router-dom";
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
const StudentCard = ({ student, regs, selected, handleExpandedClick }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.cardMedia}
        component="img"
        image={`/images/${student.image}`}
        title="Foto del estudiante"
        alt="Foto del estudiante"
      />
      <CardContent className={classes.CardContent}>
        <Typography variant="h4">
          {`${student.name} ${student.surname} ${student.second_surname}`}
        </Typography>
        <Typography variant="subtitle2">{student.dni}</Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Button color="primary">Ver Perfil</Button>
        <Button
          color="primary"
          aria-expanded={selected === student.dni}
          aria-label="show more"
          onClick={handleExpandedClick}
        >
          Matriculas
        </Button>
      </CardActions>
      <Collapse in={selected === student.dni} timeout="auto" unmountOnExit>
        <Divider />
        <CardContent>
          <List>
            {regs.map((item) => (
              <ListItem
                button
                key={item.code}
                component={Link}
                to={`/estudiante/${student.dni}/${item.section.code}`}
              >
                <ListItemIcon>
                  <FolderSharedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${item.section.code.substr(-2)} de ${
                    item.section.degree.cycle.title
                  } ${item.section.code.substr(0, 4)}`}
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
  regs: PropTypes.array,
};

export default StudentCard;
