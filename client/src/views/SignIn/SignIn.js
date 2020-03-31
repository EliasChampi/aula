import React, { useEffect, useContext } from "react";
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
import AuthService from "service/auth";
import { AuthContext, ToastContext } from "context/consumer";
import useForm from "common/useForm";

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

  const schema = {
    dni: { value: "", error: "" },
    password: { value: "", error: "" },
    type: { value: "apoderado", error: "" }
  };

  const validatorSchema = {
    dni: {
      required: true,
      validator: {
        func: value => value.length === 8,
        error: "DNI debe contener 8 Caracteres"
      }
    },
    password: {
      required: true,
      validator: {
        func: value => value.length > 5,
        error: "Su contraseña posee mas caracteres"
      }
    },
    type: {
      required: true
    }
  };

  const onSubmitForm = state => {
    AuthService.login(state)
      .then(r => {
        setUser(r);
        history.push("/");
      })
      .catch(err => {
        show(err.message, "error");
      });
  };

  const delay = () => new Promise(resolve => setTimeout(resolve, 3000));

  const {
    values,
    errors,
    dirty,
    handleOnChange,
    handleOnSubmit,
    setStateSchema,
    disable
  } = useForm(schema, validatorSchema, onSubmitForm);

  useEffect(() => {
    delay().then(() => {
      setStateSchema(schema);
    });
  }, []);

  const { dni, password, type } = values;

  return (
    <div className={classes.root}>
      <Card className={classes.mycard}>
        <CardContent>
          <form
            className={classes.form}
            onSubmit={handleOnSubmit}
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
                value={type}
                onChange={handleOnChange}
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
              error={errors.dni && dirty.dni}
              fullWidth
              helperText={errors.dni}
              label="Ingrese su DNI"
              name="dni"
              onChange={handleOnChange}
              value={dni || ""}
            />
            <TextField
              className={classes.textField}
              error={errors.password && dirty.password}
              fullWidth
              helperText={errors.password}
              label="Contraseña"
              name="password"
              onChange={handleOnChange}
              type="password"
              value={password || ""}
            />
            <Button
              className={classes.signInButton}
              color="primary"
              disabled={disable}
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
