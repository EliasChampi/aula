import React, { useEffect, useContext, useState } from "react";
import useForm from "common/useForm";
import api from "service/learnunit";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import cache from "helpers/cache";
import { Link } from "react-router-dom";
import { Header } from "views/Course/components";
import withCourses from "components/hoc/withCourses";
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const CreateLearn = ({ courses, history, match, show }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("Crear");
  const [checked, setChecked] = useState([]);
  let stateSchema = {
    name: { value: "", error: "" },
    description: { value: "", error: "" },
    trim: { value: "1er", error: "" }
  };

  const validationSchema = {
    name: {
      required: true,
      validator: {
        func: value => value.length < 50,
        error: "Demasiados caracteres para el titulo"
      }
    },
    description: {
      required: true,
      validator: {
        func: value => value.length > 10,
        error: "Muy pocos caracteres en la descripción"
      }
    },
    trim: {
      required: true
    }
  };

  const saveData = data => {
    if (title === "Crear") {
      return api.store(data);
    }
    data.code = match.params.code;
    return api.update(data, match.params.code);
  };

  const handleToggle = code => {
    const currentIndex = checked.indexOf(code);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(code);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const onSubmitForm = state => {
    state.ops = checked;
    saveData(state)
      .then(r => {
        show(r.message, "success");
        history.push("/dashboard");
      })
      .catch(err => {
        show(err.message || err, "error");
      });
  };

  const {
    values,
    errors,
    dirty,
    handleOnChange,
    handleOnSubmit,
    setStateSchema,
    disable
  } = useForm(stateSchema, validationSchema, onSubmitForm);

  useEffect(() => {
    const { code } = match.params;
    if (typeof code !== "undefined" && cache.hasThis("learn_" + code)) {
      setTitle("Modificar");
      const upschema = cache.getItem("learn_" + code);
      stateSchema = {
        name: { value: upschema.name, error: "" },
        description: { value: upschema.description, error: "" },
        trim: { value: upschema.trim, error: "" }
      };
    }
    setStateSchema(stateSchema);
    return () => {
      cache.removeItem("learn_" + code);
    };
  }, []);

  const { name, description, trim } = values;

  const RightButton = () => (
    <Button
      variant="contained"
      color="default"
      component={Link}
      to="/dashboard"
    >
      Cancelar
    </Button>
  );

  return (
    <React.Fragment>
      <Header
        subtitle="Las unidades sirven para agrupar tareas segun el tema"
        title="Unidades de Aprendizaje"
        RightButton={RightButton}
      />
      <Card>
        <CardHeader title={`${title} una unidad`} />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={errors.name && dirty.name}
                helperText={errors.name}
                label="Nombre de Unidad"
                margin="dense"
                name="name"
                onChange={handleOnChange}
                value={name}
              />
              <TextField
                fullWidth
                error={errors.description && dirty.description}
                helperText={errors.description}
                label="Descripcion"
                margin="dense"
                name="description"
                multiline
                rowsMax="3"
                onChange={handleOnChange}
                value={description}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel id="trim">Trimestre</InputLabel>
                <Select
                  labelId="trim"
                  name="trim"
                  onChange={handleOnChange}
                  value={trim}
                >
                  <MenuItem value="1er">1er Trimestre</MenuItem>
                  <MenuItem value="2do">2do Trimestre</MenuItem>
                  <MenuItem value="3ro">3ro Trimestre</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider />
          <Typography variant="subtitle1">
            Seleccione las secciones que utilizarán esta unidad
          </Typography>
          <List>
            {courses.map(item => {
              const labelId = `checkbox-list-label-${item.code}`;
              return (
                <ListItem
                  key={item.code}
                  button
                  onClick={() => handleToggle(item.code)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checked.indexOf(item.code) !== -1}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    id={labelId}
                    primary={`${
                      item.section.degree.cycle.branch.name
                    }: ${item.section.code.substr(-2)} de ${
                      item.section.degree.cycle.title
                    }`}
                    secondary={item.course.name}
                  />
                </ListItem>
              );
            })}
          </List>
        </CardContent>
        <CardActions>
          <Button
            color="primary"
            variant="contained"
            disabled={disable || !checked.length}
            onClick={handleOnSubmit}
          >
            Guardar Cambios
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default withCourses(CreateLearn);
