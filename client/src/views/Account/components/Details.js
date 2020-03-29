import React, { useContext } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from "@material-ui/core";
import { AuthContext } from "context/auth";

const Details = props => {
  const { user } = useContext(AuthContext);
  const handleChange = event => {
    /*  setValues({
      ...values,
      [event.target.name]: event.target.value
    }); */
  };

  return (
    <Card>
      <form autoComplete="off" noValidate>
        <CardHeader subheader="Informacion de mi perfil" title="Mi perfil" />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                helperText="Por favor especifique su nombre"
                label="Nombre"
                margin="dense"
                name="name"
                onChange={handleChange}
                required
                value={user.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Apellidos"
                margin="dense"
                name="surname"
                onChange={handleChange}
                required
                value={user.surname}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained">
            Guardar Cambios
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default Details;
