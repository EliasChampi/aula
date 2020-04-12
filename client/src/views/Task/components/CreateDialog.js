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
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import CloseIcon from "@material-ui/icons/Close";
import { useForm } from "react-hook-form";
import api from "service/task";
import { ToastContext } from "context/toast";
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
  mt: {
    marginTop: theme.spacing(1),
  },
  responsive: {
    width: "100%",
    height: "auto",
  },
}));

const CreateDialog = ({ open, handleClose, l_code, selected }) => {
  const classes = useStyles();
  const [link, setLink] = useState("");
  const [file, setFile] = useState({});
  const [title, setTitle] = useState("Nueva");
  const { show } = useContext(ToastContext);
  const { register, handleSubmit, errors, setValue } = useForm();

  const saveData = (data) => {
    data.link = link;
    data.learnunit_code = l_code;
    if (title === "Nueva") {
      return api.store(data);
    }
    return api.update(data, selected.code);
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
    if (link) {
      setLink("");
    } else {
      navigator.clipboard.readText().then((text) => {
        setLink(text);
      });
    }
  }

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleEnter = () => {
    setValue("title", selected.title);
    setValue("to_date", selected.to_date);
    setValue("content", selected.content);
    if (!!selected.code) {
      setValue("type", selected.type);
      setTitle("Modificar");
      setLink(selected.link);
    } else {
      setValue("type", "tr");
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
            {title} Tarea
          </Typography>
          <Button color="inherit" onClick={handleSubmit(onSubmitForm)}>
            Guardar
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <form>
          <Grid container>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Titulo de la tarea"
                margin="dense"
                error={!!errors.title}
                helperText={errors.title && errors.title.message}
                inputRef={register({ required: "Este campo es requerido" })}
                name="title"
              />

              <Grid container className={classes.mt}>
                <Grid item md={6} xs={12}>
                  <FormControl fullWidth margin="dense">
                    <InputLabel htmlFor="typeLabel">Tipo de Tarea</InputLabel>
                    <Select
                      native
                      inputProps={{ name: "type", id: "typeLabel" }}
                      inputRef={register}
                    >
                      <option value="tr">Tarea</option>
                      <option value="ta">Tarea con Adjunto</option>
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
              <Typography variant="h4">
                Usa un video para esta tarea pegando el ID del video de youtube
              </Typography>
              <img
                src="/images/youtube.png"
                alt="youtube help"
                className={classes.responsive}
              />
              <FormControl fullWidth margin="dense" className={classes.mt}>
                <Input
                  id="link"
                  type="url"
                  placeholder="pega tu ID de video aqui"
                  readOnly
                  value={link}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        component="label"
                        size="small"
                        onClick={paste}
                      >
                        {link ? "Limpiar" : "Pegar"}
                      </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Typography variant="h4">
                Usa un documento adjunto para detallar
              </Typography>
              <FormControl fullWidth margin="dense" className={classes.mt}>
                <Input
                  id="mifyle"
                  type="url"
                  placeholder="Subir Adjunto Pdf/Imagen"
                  readOnly
                  value={file.name}
                  endAdornment={
                    <InputAdornment position="end">
                      <Button
                        variant="contained"
                        component="label"
                        size="small"
                      >
                        Subir
                        <input
                          type="file"
                          accept="*/*"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </Button>
                    </InputAdornment>
                  }
                />
              </FormControl>
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
  open: PropTypes.bool,
};

export default CreateDialog;
