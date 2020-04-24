import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Grid, Typography } from "@material-ui/core";
import { Alert, Uploader } from "components";
import api from "service/response";
const FamilyCard = ({ show, register_code, code }) => {
  const [file, setFile] = useState({});
  const [response, setResponse] = useState({});
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

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item md={6} xs={12}>
            <Alert title="Subir el documento de Respuesta">
              <Typography variant="subtitle2">
                Sube tu respuesta como un documento pdf, word o una imagen
                simple, tu archivo debe pesar como minimo 32kb y maximo 3mb.
              </Typography>
            </Alert>
          </Grid>
          <Grid item md={6} xs={12}>
            <Uploader file={file} setFile={setFile} show={show} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

FamilyCard.propTypes = {
  show: PropTypes.func,
  register_code: PropTypes.string,
  code: PropTypes.number,
};

export default FamilyCard;
