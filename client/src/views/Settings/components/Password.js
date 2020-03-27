import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from "@material-ui/core";

const Password = props => {
  const { className, ...rest } = props;

  const [values, setValues] = useState({
    password: "",
    confirm: ""
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Card {...rest}>
      <form>
        <CardHeader subheader="Actualizar Contraseña" title="Contraseña" />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Contraseña"
            name="password"
            onChange={handleChange}
            type="password"
            value={values.password}
          />
          <TextField
            fullWidth
            label="Confirmar Contraseña"
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: "1rem" }}
            type="password"
            value={values.confirm}
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained">
            Actualizar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default Password;
