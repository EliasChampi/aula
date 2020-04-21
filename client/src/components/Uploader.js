import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography, IconButton } from "@material-ui/core";
import { grey, red } from "@material-ui/core/colors";
import BackupRoundedIcon from "@material-ui/icons/BackupRounded";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import { MIN_SIZE, MAX_SIZE, NAME_AND_TYPE } from "constants/file";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    border: `5px dotted ${grey[500]}`,
    borderRadius: theme.spacing(1),
    backgroundColor: grey[50],
    textAlign: "center",
  },
}));
const Uploader = ({ show, file, setFile }) => {
  const classes = useStyles();
  const handleFileChange = (event) => {
    event.persist();
    const myfile = event.target.files[0];
    if (myfile.size < MIN_SIZE || myfile.size > MAX_SIZE) {
      show("Su documento no cumple con el requerimiento del peso establecido");
    } else if (!NAME_AND_TYPE.exec(myfile.name)) {
      show("Su documento posee una extension diferente");
    } else {
      setFile(myfile);
    }
  };

  return (
    <Box className={classes.root}>
      {!file.name ? (
        <IconButton component="label">
          <BackupRoundedIcon color="primary" style={{ fontSize: 50 }} />
          <input
            type="file"
            accept=".docx, application/msword, application/pdf, image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </IconButton>
      ) : (
        <IconButton onClick={() => setFile({})}>
          <DeleteForeverRoundedIcon style={{ fontSize: 50, color: red[500] }} />
        </IconButton>
      )}
      <Typography>
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
