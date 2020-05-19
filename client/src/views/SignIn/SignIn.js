import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useForm } from "react-hook-form";

import AuthService from "service/auth";
import { AuthContext, ToastContext } from "context/consumer";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url(images/loginbg.svg)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  mycard: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "30%",
    },
  },
  form: {
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  head: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
  image: {
    width: "50%",
    marginBottom: theme.spacing(1),
  },
}));

const SignIn = (props) => {
  const { history } = props;
  const classes = useStyles();
  const { setUser } = useContext(AuthContext);
  const { show } = useContext(ToastContext);
  const { register, handleSubmit, errors } = useForm();

  const onSubmitForm = (data) => {
    AuthService.login(data)
      .then((r) => {
        setUser(r);
        history.push("/");
      })
      .catch((err) => {
        show(err.message, "error");
      });
  };

  return (
    <div className={classes.root}>
      <Card className={classes.mycard} elevation={4}>
        <CardContent>
          <form
            className={classes.form}
            onSubmit={handleSubmit(onSubmitForm)}
            autoComplete="off"
          >
            <div className={classes.head}>
              <img
                src="/images/mini.png"
                alt="logo"
                className={classes.image}
              />
              <Typography variant="h2">Bienvenido al Aula virtual</Typography>
              <Typography color="textSecondary" gutterBottom>
                Ingrese sus credenciales de autenticación para acceder
              </Typography>
              <RadioGroup row name="type" defaultValue="apoderado">
                <FormControlLabel
                  value="apoderado"
                  control={<Radio inputRef={register} />}
                  label="Estudiante"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="docente"
                  control={<Radio inputRef={register} />}
                  label="Docente"
                  labelPlacement="end"
                />
              </RadioGroup>
            </div>
            <Divider />
            <TextField
              className={classes.textField}
              error={!!errors.dni}
              fullWidth
              helperText={errors.dni && errors.dni.message}
              label="Ingrese su DNI"
              inputRef={register({
                required: "DNI es requerido",
                validate: (value) => value.length === 8,
              })}
              name="dni"
            />
            <TextField
              className={classes.textField}
              error={!!errors.password}
              fullWidth
              helperText={errors.password && errors.password.message}
              inputRef={register({
                required: "Contraseña es requerido",
                minLength: {
                  value: 4,
                  message: "contraseña posee mas caracteres",
                },
              })}
              label="Contraseña"
              name="password"
              type="password"
            />
            <Button
              className={classes.signInButton}
              color="primary"
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Olvidé mi Contraseña
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default SignIn;
