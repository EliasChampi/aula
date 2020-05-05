import React, { useEffect, useState } from "react";
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
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import api from "service/unit";
import { Header, withCourses } from "components";
import cache from "helpers/cache";
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const CreateUnit = ({ courses, history, match, show }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("Crear");
  const [checked, setChecked] = useState([]);
  const { register, handleSubmit, errors, setValue } = useForm();
  const { code } = match.params;
  
  const saveData = (data) => {
    if (title === "Crear") {
      return api.store(data);
    }
    data.code = code;
    return api.update(data, code);
  };

  const onSubmitForm = (state) => {
    if (!checked.length) return;
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
    if (typeof code !== "undefined" && cache.hasThis("unit_" + code)) {
      const unit = cache.getItem("unit_" + code);
      setValue("name", unit.name);
      setValue("trim", unit.trim);
      setValue("description", unit.description);
      setTitle("Modificar");
    }
    return () => {
      cache.removeItem("unit_" + code);
    };
  }, [code, setValue]);

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
        subtitle="Las unidades sirven para agrupar actividades segun el tema"
        title="Unidades de Aprendizaje"
        RightButton={
          <Button
            variant="contained"
            color="default"
            component={Link}
            to="/dashboard"
          >
            Cancelar
          </Button>
        }
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
            color="secondary"
            variant="contained"
            onClick={handleSubmit(onSubmitForm)}
          >
            Guardar Cambios
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default withCourses(CreateUnit);
