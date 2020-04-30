import React, { useState, useContext } from "react";
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  DialogContent,
  Button,
  Typography,
  Slide,
  Grid,
  TextField,
  InputLabel,
  InputAdornment,
  FormControl,
  Input,
  Select,
  Paper,
} from "@material-ui/core";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import { useForm } from "react-hook-form";
import api from "service/activity";
import { ToastContext } from "context/toast";
import { Alert, Uploader } from "components";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
    color: "white",
  },
  marginX: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  responsive: {
    width: "100%",
    height: "auto",
  },
  padding: {
    padding: theme.spacing(2),
  },
}));

const CreateDialog = ({ open, handleClose, u_code, selected }) => {
  const classes = useStyles();
  const [videoid, setVideoId] = useState("");
  const [file, setFile] = useState({});
  const [title, setTitle] = useState("Nueva");
  const { show } = useContext(ToastContext);
  const { register, handleSubmit, errors, setValue } = useForm();

  const saveData = (data) => {
    data.videoid = videoid;
    data.unit_code = u_code;
    if (selected.attached !== null && Object.keys(file).length === 0) {
      data.hbd = true;
    }
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", file);
    if (title === "Nueva") {
      return api.store(formData);
    }
    return api.update(formData, selected.code);
  };

  const onSubmitForm = (data) => {
    saveData(data)
      .then((res) => {
        show(res.message, "success");
        handleClose("saved");
      })
      .catch((error) => {
        show(error.message || error, "error");
      });
  };

  function paste() {
    if (videoid) {
      setVideoId("");
    } else {
      navigator.clipboard.readText().then((text) => {
        setVideoId(text);
      });
    }
  }

  const handleEnter = () => {
    setFile({});
    setValue("title", selected.title);
    setValue("to_date", selected.to_date);
    setValue("content", selected.content);
    if (!!selected.code) {
      setValue("type", selected.type);
      setTitle("Modificar");
      setVideoId(selected.videoid);
      if (selected.attached) {
        setFile({
          name: selected.attached,
        });
      }
    } else {
      setValue("type", "ac");
      setTitle("Nueva");
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onEnter={() => handleEnter()}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h3" className={classes.title}>
            {title} Actividad
          </Typography>
          <Button color="inherit" onClick={handleSubmit(onSubmitForm)}>
            Guardar
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <form>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Titulo de la Actividad"
                margin="dense"
                error={!!errors.title}
                helperText={errors.title && errors.title.message}
                inputRef={register({ required: "Este campo es requerido" })}
                name="title"
              />

              <Grid container className={classes.marginX}>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="typeLabel">Tipo de Actividad</InputLabel>
                    <Select
                      native
                      inputProps={{ name: "type", id: "typeLabel" }}
                      inputRef={register}
                    >
                      <option value="ac">Actividad</option>
                      <option value="ct">Cuestionario</option>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    margin="dense"
                    name="to_date"
                    label="Fecha de Entrega"
                    type="date"
                    error={!!errors.to_date}
                    helperText={errors.to_date && errors.to_date.message}
                    inputRef={register({ required: "Este campo es requerido" })}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                multiline
                rows={3}
                rowsMax={4}
                label="Instrucciones"
                margin="dense"
                error={!!errors.content}
                helperText={errors.content && errors.content.message}
                inputRef={register({
                  required: "Este campo es requerido",
                  maxLength: {
                    value: 300,
                    message: "demasiados caracteres",
                  },
                  minLength: {
                    value: 10,
                    message: "muy pocos caracteres",
                  },
                })}
                name="content"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Paper className={clsx(classes.padding, classes.marginX)}>
                <Typography variant="h5">
                  Usa un video para esta actividad pegando el ID del video de
                  youtube
                </Typography>
                <img
                  src="/images/youtube.png"
                  alt="youtube help"
                  className={classes.responsive}
                />
                <FormControl fullWidth margin="dense">
                  <Input
                    id="videoid"
                    type="url"
                    placeholder="ID del video. ejm 7NHm5moJwiQ"
                    readOnly
                    value={videoid}
                    endAdornment={
                      <InputAdornment position="end">
                        <Button
                          variant="contained"
                          component="label"
                          size="small"
                          onClick={paste}
                        >
                          {videoid ? "Limpiar" : "Pegar"}
                        </Button>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Paper>
              <Alert title="Compartir material Adjunto">
                <Typography variant="subtitle2">
                  Sube un documento pdf, word o una imagen simple para compartir
                  con tus estudiantes, tu archivo debe pesar como minimo 32kb y
                  maximo 3mb.
                </Typography>
              </Alert>
              <div className={classes.marginX}>
                <Uploader show={show} file={file} setFile={setFile} />
              </div>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
    </Dialog>
  );
};

CreateDialog.propTypes = {
  handleClose: PropTypes.func.isRequired,
  selected: PropTypes.object,
  u_code: PropTypes.any,
  open: PropTypes.bool,
};

export default CreateDialog;
