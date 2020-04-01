import React, { useEffect, useContext, useState } from "react";
import Operative from "views/wrapper/Operative";
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
  MenuItem
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { ToastContext } from "context/toast";
import cache from "helpers/cache";
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const CreateLearn = props => {
  const classes = useStyles();
  const { op_code, section_code, code } = props.match.params;
  const { show } = useContext(ToastContext);
  const [title, setTitle] = useState("Crear");
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

  //const delay = () => new Promise(resolve => setTimeout(resolve, 3000));
  const saveData = data => {
    if (title === "Crear") {
      return api.store(data);
    }
    data.code = code;
    return api.update(data, code);
  };

  const onSubmitForm = state => {
    state.operative_teacher_code = op_code;
    saveData(state)
      .then(r => {
        show(r.message, "success");
        props.history.push(`/unidades/${section_code}/${op_code}`);
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
    /*     delay().then(() => {
    }); */
    return () => {
      cache.removeItem("learn_" + code);
    };
  }, []);

  const { name, description, trim } = values;

  const RightButton = () => (
    <Button
      variant="contained"
      onClick={handleOnSubmit}
      color="primary"
      disabled={disable}
    >
      Guardar
    </Button>
  );

  return (
    <Operative title={`${title} una unidad`} RightButton={RightButton}>
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
                label="Titulo"
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
        </CardContent>
      </Card>
    </Operative>
  );
};

export default CreateLearn;
