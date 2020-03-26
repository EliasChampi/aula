import React, { useState, useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Button,
  TextField,
  Typography,
  Card,
  CardContent,
  CardActions,
  Divider,
  Avatar,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@material-ui/core";
import AuthService from "../../service/auth";
import { AuthContext, ToastContext } from "../../context/consumer";
const schema = {
  dni: {
    presence: { allowEmpty: false, message: "campo requerido" },
    length: {
      maximum: 8
    }
  },
  password: {
    presence: { allowEmpty: false, message: "campo requerido" },
    length: {
      maximum: 10
    }
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: "url(images/auth.png)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  },
  mycard: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "30%"
    }
  },
  form: {
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  avatar: {
    margin: "auto",
    backgroundColor: theme.palette.error.main
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
}));

const SignIn = props => {
  const { history } = props;
  const classes = useStyles();
  const { setUser } = useContext(AuthContext);
  const { show } = useContext(ToastContext);
  const [formState, setFormState] = useState({
    isValid: false,
    values: {
      type: "apoderado"
    },
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleSignIn = event => {
    event.preventDefault();
    AuthService.login(formState.values)
      .then(r => {
        setUser(r);
        history.push("/");
      })
      .catch(err => {
        show(err.message, "error");
      });
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  return (
    <div className={classes.root}>
      <Card className={classes.mycard}>
        <CardContent>
          <form
            className={classes.form}
            onSubmit={handleSignIn}
            autoComplete="off"
          >
            <div style={{ textAlign: "center" }}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography className={classes.title} variant="h2">
                Bienvenido al Aula virtual
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                Ingrese sus credenciales de autenticación para acceder
              </Typography>
              <RadioGroup
                row
                name="type"
                value={formState.values.type}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="apoderado"
                  control={<Radio color="primary" />}
                  label="Apoderado"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="docente"
                  control={<Radio color="primary" />}
                  label="Docente"
                  labelPlacement="end"
                />
              </RadioGroup>
            </div>
            <Divider />
            <TextField
              className={classes.textField}
              error={hasError("dni")}
              fullWidth
              helperText={hasError("dni") ? formState.errors.dni[0] : null}
              label="Ingrese su DNI"
              name="dni"
              onChange={handleChange}
              type="text"
              value={formState.values.dni || ""}
              variant="outlined"
            />
            <TextField
              className={classes.textField}
              error={hasError("password")}
              fullWidth
              helperText={
                hasError("password") ? formState.errors.password[0] : null
              }
              label="Contraseña"
              name="password"
              onChange={handleChange}
              type="password"
              value={formState.values.password || ""}
              variant="outlined"
            />
            <Button
              className={classes.signInButton}
              color="primary"
              disabled={!formState.isValid}
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

SignIn.propTypes = {
  history: PropTypes.object
};

export default withRouter(SignIn);
