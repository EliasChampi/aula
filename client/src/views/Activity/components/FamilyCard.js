import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { Alert, Uploader } from "components";
import api from "service/response";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  img: {
    width: "50%",
  },
}));

const FamilyCard = ({ show, register_code, code }) => {
  const [file, setFile] = useState({});
  const [response, setResponse] = useState({});
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    let mounted = true;
    api
      .fetchByKeys(register_code, code)
      .then((r) => {
        if (mounted) {
          setResponse(r.value);
        }
      })
      .catch((error) => {
        show(error.message || error, "error");
      });
    return () => {
      mounted = false;
    };
  }, []);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        register_code: register_code,
        activity_code: code,
      })
    );
    formData.append("file", file);
    api
      .store(formData)
      .then((res) => {
        show(res.message, "success");
        handleSetFile({}, false);
      })
      .catch((error) => {
        show(error.message || error, "error");
      });
  };

  const handleSetFile = (value, open = true) => {
    setFile(value);
    setOpen(open);
  };

  return (
    <React.Fragment>
      <Card>
        <CardContent>
          {!response ? (
            <Grid container spacing={3} alignItems="center">
              <Grid item md={6} xs={12}>
                <Alert title="Subir el documento de Respuesta">
                  <Typography variant="subtitle2">
                    Sube tu respuesta como un documento pdf, word o una imagen
                    simple, tu archivo debe pesar como minimo 32kb y maximo 3mb.
                  </Typography>
                </Alert>
              </Grid>
              <Grid item md={6} xs={12}>
                <Uploader file={file} setFile={handleSetFile} show={show} />
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={3} alignItems="center">
              <Grid item md={6} xs={12}>
                <img
                  src="/images/respuesta.svg"
                  className={classes.img}
                  alt="respuesta"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <Typography variant="subtitle2">
                  Ya subiste una respuesta a esta actividad, pronto recibirás la
                  calificación
                </Typography>
                <Button variant="outlined" color="secondary">
                  Descargar
                </Button>
              </Grid>
            </Grid>
          )}
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={() => handleSetFile({}, false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmar</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            El documento <b>{file.name}</b> será enviado al docente
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSetFile({}, false)} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleUpload} color="secondary" autoFocus>
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

FamilyCard.propTypes = {
  show: PropTypes.func,
  register_code: PropTypes.string,
  code: PropTypes.string,
};

export default FamilyCard;
