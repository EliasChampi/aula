import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
} from "@material-ui/core";

const Details = ({ user }) => {

  const handleChange = (event) => {
    console.log(event);
  };

  return (
    <Card>
      <form autoComplete="off" noValidate>
        <CardHeader subheader="Actualizar mi Contraseña" title="Seguridad" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                label="Contraseña Actual"
                name="surname"
                variant="outlined"
                type="password"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Nueva Contraseña"
                name="currentpass"
                variant="outlined"
                onChange={handleChange}
                type="password"
                value={user.currentPass}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Confirmar"
                name="newpass"
                variant="outlined"
                onChange={handleChange}
                type="password"
                value={user.newPass}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="secondary">Guardar Cambios</Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default Details;
