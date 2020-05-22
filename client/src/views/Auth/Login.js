import React, { useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@material-ui/core";
import { useForm } from "react-hook-form";

import AuthService from "service/auth";
import { AuthContext, ToastContext } from "context/consumer";
import { Auth } from "./components";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
  center: {
    justifyContent: "center",
  },
}));

const Login = ({ history }) => {
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
    <Auth
      title="Bienvenido al Aula Virtual"
      subtitle="Ingrese sus credenciales de autenticación para acceder"
      back="/recuperar"
      backname="Olvide mi Contraseña"
    >
      <form
        className={classes.form}
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete="off"
      >
        <RadioGroup
          row
          name="type"
          defaultValue="estudiante"
          className={classes.center}
        >
          <FormControlLabel
            value="estudiante"
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
        <TextField
          fullWidth
          variant="outlined"
          className={classes.textField}
          error={!!errors.dni}
          helperText={errors.dni && errors.dni.message}
          label="Ingrese su DNI"
          name="dni"
          inputRef={register({
            required: "Su dni es requerido",
            pattern: {
              value: /^([0-9]){8}$/,
              message: "Su dni posee 8 numeros",
            },
          })}
        />
        <TextField
          fullWidth
          variant="outlined"
          className={classes.textField}
          error={!!errors.password}
          helperText={errors.password && errors.password.message}
          label="Contraseña"
          name="password"
          type="password"
          inputRef={register({
            required: "Su contraseña es requerido",
            minLength: {
              value: 6,
              message: "contraseña posee mas caracteres",
            },
          })}
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
    </Auth>
  );
};

export default Login;
