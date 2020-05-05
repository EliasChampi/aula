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
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
  },
}));

const Details = ({ user }) => {
  const classes = useStyles();
  const handleChange = (event) => {
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
                label="Nombre"
                margin="dense"
                name="name"
                disabled
                value={user.name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Apellidos"
                margin="dense"
                name="surname"
                disabled
                value={user.surname}
              />
            </Grid>
          </Grid>
          <Typography className={classes.margin} variant="subtitle2">
            Actualizar Contraseña
          </Typography>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Contraseña Actual"
                name="currentpass"
                onChange={handleChange}
                type="password"
                value={user.currentPass}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Contraseña Nueva"
                name="newpass"
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
