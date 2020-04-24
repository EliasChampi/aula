import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "service/task";
import { Header } from "components";
import { taskType, yourdate } from "common/decorator";
import { orange } from "@material-ui/core/colors";
import YouTubeIcon from "@material-ui/icons/YouTube";
import LockOutlinedIcon from "@material-ui/icons/Description";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import EventIcon from "@material-ui/icons/Event";
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
  Hidden,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { downloadFile } from "common/utils";
const useStyles = makeStyles((theme) => ({
  mt: {
    marginTop: theme.spacing(2),
    justifyContent: "space-around",
  },
  avatar: {
    backgroundColor: orange[500],
  },
  content: {
    display: "flex",
    alignItems: "center",
  },
  ml: {
    marginLeft: theme.spacing(2),
  },
}));
const TaskItem = ({ code, handleBackClick, show }) => {
  const [task, setTask] = useState({});
  const [loading, setLoading] = useState(true);
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
    <Button color="secondary" variant="contained" onClick={handleBackClick}>
      Volver a tareas
    </Button>
  );

  const handleDownloadClick = () => {
    api
      .downloadAttached(task.code)
      .then((r) => {
        downloadFile(r, task.attached);
      })
      .catch((error) => {
        show(error, "error");
      });
  };

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
                <IconButton
                  aria-label="Descargar Adjunto"
                  onClick={handleDownloadClick}
                  disabled={!task.attached}
                >
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
            <Grid container spacing={4} className={classes.mt}>
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
              <Hidden mdDown>
                <Divider orientation="vertical" flexItem />
              </Hidden>
              <Grid item className={classes.content}>
                <Avatar className={classes.avatar}>
                  <EventIcon />
                </Avatar>
                <div className={classes.ml}>
                  <Typography variant="subtitle2">
                    <b>Creado el: </b>
                    {yourdate(task.created_at)}
                  </Typography>
                  <Typography variant="subtitle2">
                    <b>Para: </b>
                    {yourdate(task.to_date)}
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  );
};
TaskItem.propTypes = {
  code: PropTypes.string.isRequired,
  handleBackClick: PropTypes.func.isRequired,
  show: PropTypes.func.isRequired,
};

export default TaskItem;
