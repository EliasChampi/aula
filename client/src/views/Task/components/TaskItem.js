import React, { useEffect, useContext, useState } from "react";
import api from "service/task";
import { ToastContext } from "context/toast";
import { Header } from "components";
import { taskType, mydate } from "common/decorator";
import { red } from "@material-ui/core/colors";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LockOutlinedIcon from "@material-ui/icons/Description";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import {
  Button,
  Card,
  Typography,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Avatar,
  CardMedia,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles((theme) => ({
  mt: {
    marginTop: theme.spacing(2),
    justifyContent: "space-around",
  },
  avatar: {
    backgroundColor: red[500],
  },
  content: {
    display: "flex",
    alignItems: "center",
  },
  ml: {
    marginLeft: theme.spacing(2),
  },
}));
const TaskItem = ({ match }) => {
  const {
    params: { code },
  } = match;
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
  const { show } = useContext(ToastContext);
  const classes = useStyles();

  useEffect(() => {
    let mounted = true;
    const fetchTask = () => {
      api
        .fetchByCodeWithLearn(code)
        .then((r) => {
          if (mounted) {
            setTask(r.value);
          }
        })
        .catch((error) => {
          show(error.message || error, "error");
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchTask();
    return () => {
      mounted = false;
    };
  }, []);

  const RightButton = () => (
    <Button variant="contained" color="primary">
      Ver mis Tareas
    </Button>
  );

  return (
    <React.Fragment>
      <Header
        title={taskType[task.type]}
        subtitle={task.title}
        RightButton={RightButton}
      />
      {!loading && (
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                <YouTubeIcon />
              </Avatar>
            }
            action={
              <Tooltip title="Descargar Adjunto">
                <IconButton aria-label="Descargar Adjunto">
                  <DownloadIcon />
                </IconButton>
              </Tooltip>
            }
            title={`Unidad: ${task.learn.name}`}
            subheader={task.learn.description}
          />
          <CardMedia
            component="iframe"
            height={480}
            src={`https://www.youtube.com/embed/${task.link}`}
            title={task.title}
          />
          <CardContent>
            <Grid container className={classes.mt}>
              <Grid item className={classes.content}>
                <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar>
                <div className={classes.ml}>
                  <Typography component="h5" variant="h5">
                    Instrucciones
                  </Typography>
                  <Divider />
                  <Typography variant="subtitle2">{task.content}</Typography>
                </div>
              </Grid>
              <Divider orientation="vertical" flexItem />
              <Grid item>
                <Typography variant="subtitle2">
                  <b>Fecha de Creación: </b>
                  {mydate(task.created_at)}
                </Typography>
                <Typography variant="subtitle2">
                  <b>Fecha de Entrega: </b>
                  {mydate(task.to_date)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  );
};
export default TaskItem;
