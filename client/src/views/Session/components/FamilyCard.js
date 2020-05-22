import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  Typography,
  Button,
  DialogContentText,
  CardHeader,
  LinearProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import clsx from "clsx";

import api from "service/response";
import { Uploader, Modal, Alert } from "components";
import { yourdate } from "common/decorator.js";
import { downloadFile } from "common/utils";
const useStyles = makeStyles((theme) => ({
  img: {
    width: "40%",
  },
  dflex: {
    display: "flex",
  },
  center: {
    margin: "auto",
  },
  score: {
    background: "cornsilk",
    border: `2px dotted ${theme.palette.secondary.main}`,
    padding: theme.spacing(2),
    width: "10em",
    textAlign: "center",
  },
  mw: {
    maxWidth: "50%",
  },
}));

const CardItem = ({ title, subheader, children, action, handleClick }) => {
  return (
    <Card>
      <CardHeader
        title={title}
        subheader={subheader}
        action={
          action ? (
            <Button
              color="secondary"
              variant="outlined"
              size="small"
              onClick={handleClick}
              startIcon={<DownloadIcon />}
            >
              Respuesta
            </Button>
          ) : null
        }
      />
      <CardContent>{children}</CardContent>
    </Card>
  );
};

const FamilyCard = ({ show, register_code, code }) => {
  const [file, setFile] = useState({});
  const [response, setResponse] = useState({});
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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
  }, [register_code, code]);

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
    setLoading(true);
    api
      .store(formData)
      .then((res) => {
        show(res.message, "success");
        handleSetFile({}, false);
      })
      .catch((error) => {
        show(error.message || error, "error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSetFile = (value, open = true) => {
    setFile(value);
    setOpen(open);
  };

  const handleDownload = () => {
    api
      .downloadAttached(register_code, code)
      .then((r) => {
        downloadFile(r, response.attached);
      })
      .catch((error) => {
        show(error, "error");
      });
  };

  return (
    <React.Fragment>
      {!response ? (
        <CardItem
          title="Subir Documento de Respuesta"
          subheader="Sube tu respuesta como un documento pdf, word o una imagen
            simple, tu archivo debe pesar como minimo 10kb y maximo 3mb"
          action={false}
        >
          <Uploader
            className={clsx(classes.mw, classes.center)}
            file={file}
            setFile={handleSetFile}
            show={show}
          />
        </CardItem>
      ) : !response.score ? (
        <CardItem
          title="Ya subiste una respuesta a esta actividad"
          subheader={`Fecha de respuesta: ${yourdate(
            response.created_at,
            "[a las] hh:mm a"
          )}`}
          action={true}
          handleClick={handleDownload}
        >
          <img
            className={clsx(classes.dflex, classes.img, classes.center)}
            src="/images/respuesta.svg"
            title="respuesta"
            alt="respuesta img"
          />
        </CardItem>
      ) : (
            <CardItem
              title="Su respuesta ha sido calificado:"
              subheader={`Fecha de calificación: ${yourdate(
                response.updated_at,
                "[a las] hh:mm a"
              )}`}
              action={true}
              handleClick={handleDownload}
            >
              <Typography
                variant="h4"
                color="textSecondary"
                className={clsx(classes.score, classes.center)}
              >
                <b>Nota:</b> {response.score === 'N' ? 'No hay calificación' : response.score}
              </Typography>
              <br />
              <Alert title="Observaciones:">
                <Typography variant="subtitle2">{response.obs}</Typography>
              </Alert>
            </CardItem>
          )}
      <Modal
        open={open}
        close={() => handleSetFile({}, false)}
        title="Confirmar"
        handleConfirm={handleUpload}
      >
        {loading && <LinearProgress />}
        <DialogContentText id="alert-dialog-description">
          El documento <b>{file.name}</b> será enviado al docente
        </DialogContentText>
      </Modal>
    </React.Fragment>
  );
};

FamilyCard.propTypes = {
  show: PropTypes.func,
  register_code: PropTypes.string,
  code: PropTypes.string,
};

export default FamilyCard;
