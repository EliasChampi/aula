import React, { useEffect, useState } from "react";
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
  CardActions,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import withCourses from "components/hoc/withCourses";
import cache from "helpers/cache";
import { Header } from "views/Course/components";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const CreateLearn = ({ courses, history, match, show }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("Crear");
  const [checked, setChecked] = useState([]);
  const { register, handleSubmit, errors, setValue } = useForm();

  const saveData = (data) => {
    if (title === "Crear") {
      return api.store(data);
    }
    data.code = match.params.code;
    return api.update(data, match.params.code);
  };

  const onSubmitForm = (state) => {
    state.ops = checked;
    saveData(state)
      .then((r) => {
        show(r.message, "success");
        history.push("/dashboard");
      })
      .catch((error) => {
        show(error.message || error, "error");
      });
  };

  useEffect(() => {
    const { code } = match.params;
    if (typeof code !== "undefined" && cache.hasThis("learn_" + code)) {
      const learn = cache.getItem("learn_" + code);
      setValue("name", learn.name);
      setValue("trim", learn.trim);
      setValue("description", learn.description);
      setTitle("Modificar");
    }
    return () => {
      cache.removeItem("learn_" + code);
    };
  }, []);

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

  const handleToggle = (code) => {
    const currentIndex = checked.indexOf(code);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(code);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

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
                error={!!errors.name}
                helperText={errors.name && errors.name.message}
                label="Nombre de Unidad"
                margin="dense"
                name="name"
                inputRef={register({
                  required: "Campo requerido",
                  maxLength: {
                    value: 50,
                    message: "Demasiados caracteres",
                  },
                })}
              />
              <TextField
                fullWidth
                error={!!errors.description}
                helperText={errors.description && errors.description.message}
                label="Descripcion"
                margin="dense"
                name="description"
                multiline
                rows="3"
                rowsMax="4"
                inputRef={register({
                  required: "Campo requerido",
                  maxLength: {
                    value: 300,
                    message: "Demasiados caracteres",
                  },
                  minLength: {
                    value: 10,
                    message: "Muy pocos caracteres",
                  },
                })}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl fullWidth className={classes.margin}>
                <InputLabel htmlFor="trim">Trimestre</InputLabel>
                <Select
                  native
                  inputRef={register}
                  inputProps={{
                    name: "trim",
                    id: "trim",
                  }}
                  defaultValue="1ro"
                >
                  <option value="1ro">1er Trimestre</option>
                  <option value="2do">2do Trimestre</option>
                  <option value="3ro">3ro Trimestre</option>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Divider />
          <Typography variant="subtitle1">
            Seleccione las secciones que utilizarán esta unidad
          </Typography>
          <List>
            {courses.map((item) => {
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
            disabled={!checked.length}
            onClick={handleSubmit(onSubmitForm)}
          >
            Guardar Cambios
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default withCourses(CreateLearn);
