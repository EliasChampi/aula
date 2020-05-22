import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
} from "@material-ui/core";
import { useForm } from "react-hook-form";

import AuthService from "service/auth";
import { Auth } from "./components";
import { withToast } from "components";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(2),
  },
  signInButton: {
    margin: theme.spacing(2, 0),
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: "underline",
    cursor: "pointer",
  },
}));

const Recover = ({ show }) => {
  const classes = useStyles();

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [type, setType] = useState("estudiante");
  const [response, setResponse] = useState("");

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    setNum1(Math.floor(Math.random() * 99) + 1);
    setNum2(Math.floor(Math.random() * 99) + 1);
  }, []);

  const onSubmitForm = (data) => {
    data.type = type;
    AuthService.recoverPassword(data)
      .then((r) => {
        setResponse(r.value);
        show(r.message, "success");
      })
      .catch((err) => {
        show(err.message, "error");
      });
  };

  const copyPass = () => {
    navigator.clipboard.writeText(response).then(() => {
      show("Contraseña copiado ☺", "success");
    });
  };

  return (
    <Auth title="Recuperar Contraseña" back="/login" backname="Volver a Login">
      <form
        className={classes.form}
        onSubmit={handleSubmit(onSubmitForm)}
        autoComplete="off"
      >
        <Select
          fullWidth
          id="typeSelect"
          value={type}
          variant="outlined"
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="estudiante">Soy Estudiante</MenuItem>
          <MenuItem value="docente">Soy Docente</MenuItem>
        </Select>
        <TextField
          fullWidth
          variant="outlined"
          className={classes.textField}
          error={!!errors.dni}
          helperText={errors.dni && errors.dni.message}
          name="dni"
          label="Ingrese su DNI"
          inputRef={register({
            required: "Su dni es obligatorio",
            pattern: {
              value: /^([0-9]){8}$/,
              message: "Su DNI posee 8 numeros",
            },
          })}
        />
        <TextField
          fullWidth
          variant="outlined"
          className={classes.textField}
          error={!!errors.birthdate}
          helperText={errors.birthdate && errors.birthdate.message}
          name="birthdate"
          label="Ingrese su Fecha de Nacimiento"
          placeholder={type === "docente" ? "DD/MM" : "AAAA-MM-DD"}
          inputRef={register({
            required: "Este campo es obligatorio",
          })}
        />
        <TextField
          fullWidth
          variant="outlined"
          className={classes.textField}
          error={!!errors.sum}
          helperText={errors.sum && "La respuesta no es correcta"}
          name="sum"
          label={`Ingrese respuesta de ${num1} + ${num2}`}
          inputRef={register({
            validate: (value) => value == num1 + num2,
          })}
        />
        {response && (
          <Typography className={classes.textField} variant="subtitle1">
            Esta es tu nueva contraseña: <b>{response}</b>
            <span className={classes.link} onClick={copyPass}>
              {" "}
              Copia y Guardalo.
            </span>
          </Typography>
        )}
        <Button
          className={classes.signInButton}
          color="primary"
          fullWidth
          size="large"
          type="submit"
          variant="contained"
        >
          Solicitar nueva Contraseña
        </Button>
      </form>
    </Auth>
  );
};

export default withToast(Recover);
