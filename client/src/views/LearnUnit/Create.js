import React, { useEffect } from "react";
import Operative from "views/wrapper/Operative";
import useForm from "common/useForm";
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
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const CreateLearn = props => {
  const classes = useStyles();
  const { op_code, section_code } = props.match.params;

  const stateSchema = {
    title: { value: "", error: "" },
    description: { value: "", error: "" },
    trim: { value: "1er", error: "" }
  };

  const validationSchema = {
    title: {
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

  const delay = () => new Promise(resolve => setTimeout(resolve, 3000));

  const onSubmitForm = state => {
    console.log(state);
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
    delay().then(() => {
      setStateSchema(stateSchema);
    });
  }, []);

  const { title, description, trim } = values;

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
    <Operative title="Crear una nuevo unidad" RightButton={RightButton}>
      <Card>
        <CardHeader title="Crear una nueva Unidad" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={errors.title && dirty.title}
                helperText={errors.title}
                label="Titulo"
                margin="dense"
                name="title"
                onChange={handleOnChange}
                value={title}
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
