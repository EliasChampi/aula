import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, IconButton } from "@material-ui/core";
import BackupRoundedIcon from "@material-ui/icons/BackupRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { MIN_SIZE, MAX_SIZE, NAME_AND_TYPE } from "constants/file";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    border: `5px dotted ${theme.palette.secondary.dark}`,
    borderRadius: theme.spacing(1),
    textAlign: "center",
  },
  iconFontSize: {
    fontSize: "50px",
  },
}));
const Uploader = ({ show, file, setFile, className }) => {
  const classes = useStyles();
  const handleFileChange = (event) => {
    event.persist();
    const myfile = event.target.files[0];
    if (myfile.size < MIN_SIZE || myfile.size > MAX_SIZE) {
      show("Su archivo no cumple con el peso establecido");
    } else if (!NAME_AND_TYPE.exec(myfile.name)) {
      show("Su archivo posee una extension desconocida");
    } else {
      setFile(myfile);
    }
  };

  return (
    <Box className={clsx(classes.root, className)}>
      {!file.name ? (
        <IconButton component="label">
          <BackupRoundedIcon
            color="secondary"
            className={classes.iconFontSize}
          />
          <input
            type="file"
            accept=".docx, application/msword, application/pdf, image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </IconButton>
      ) : (
        <IconButton onClick={() => setFile({})}>
          <DeleteForeverRoundedIcon className={classes.iconFontSize} />
        </IconButton>
      )}
      <Typography component="i" variant="subtitle2">
        {file.name || "Seleccione un documento para subir"}
      </Typography>
    </Box>
  );
};

Uploader.propTypes = {
  show: PropTypes.func.isRequired,
  file: PropTypes.any.isRequired,
  setFile: PropTypes.func.isRequired,
};

export default Uploader;
