import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import YouTubeIcon from "@material-ui/icons/YouTube";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import {
  Button,
  Card,
  Typography,
  CardHeader,
  CardContent,
  Divider,
  Avatar,
  CardMedia,
  CardActions,
  Paper,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import { withRouter } from "react-router-dom";

import { downloadFile } from "common/utils";
import api from "service/activity";
import { Header, Title } from "components";
import { activityType, yourdate, cycleTypes } from "common/decorator.js";
const useStyles = makeStyles((theme) => ({
  mt: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
  dflex: {
    display: "flex",
  },
  jusAr: {
    justifyContent: "space-around",
  },
  padding: {
    padding: theme.spacing(2),
  },
}));
const ActivityItem = ({ show, match, history }) => {
  const [activity, setActivity] = useState({});
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const { section_code, code } = match.params;
  useEffect(() => {
    let mounted = true;
    const fetchActivity = () => {
      api
        .fetchByCode(section_code, code)
        .then((r) => {
          if (mounted) {
            setActivity(r.value);
          }
        })
        .catch((error) => {
          show(error.message || error, "error");
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchActivity();
    return () => {
      mounted = false;
    };
  }, [section_code,code]);

  const handleDownloadClick = () => {
    api
      .downloadAttached(activity.code)
      .then((r) => {
        downloadFile(r, activity.attached);
      })
      .catch((error) => {
        show(error, "error");
      });
  };

  return (
    <React.Fragment>
      <Header
        title={activityType[activity.type]}
        subtitle={activity.title}
        RightButton={
          <Button variant="contained" onClick={() => history.goBack()}>
            Volver a Actividades
          </Button>
        }
      />
      {!loading && (
        <Card>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                <YouTubeIcon />
              </Avatar>
            }
            title="Contenido de la Actividad"
          />
          <CardMedia
            component={activity.videoid ? "iframe" : "img"}
            height={480}
            src={
              activity.videoid
                ? `https://www.youtube.com/embed/${activity.videoid}`
                : "/images/mibg.svg"
            }
            title={activity.title}
          />
          <CardContent>
            <Paper className={classes.padding}>
              <Title title="Descripción:" />
              <Typography variant="subtitle2">
                <b>Aula: </b>
                {`${section_code.substr(-2)} de ${
                  cycleTypes[section_code.substr(4, 3)]
                }`}
              </Typography>
              <Typography variant="subtitle2">
                <b>Curso:</b> {activity.unit.Operatives[0].course.name}
              </Typography>
              <Typography variant="subtitle2">
                <b>Unidad de Aprendizaje:</b> {activity.unit.name}
              </Typography>
              <Typography variant="subtitle2">
                <b>Instrucciones:</b> {activity.content}
              </Typography>
              <Button
                onClick={handleDownloadClick}
                className={classes.mt}
                disabled={!activity.attached}
                variant="outlined"
                color="secondary"
                startIcon={<DownloadIcon />}
              >
                Material
              </Button>
            </Paper>
          </CardContent>
          <Divider />
          <CardActions
            className={clsx(classes.padding, classes.dflex, classes.jusAr)}
          >
            <Typography variant="subtitle2">
              <b>Creado el: </b>
              {yourdate(activity.created_at, "[a las] hh:mm a")}
            </Typography>
            <Typography variant="subtitle2">
              <b>Fecha de Entrega: </b>
              {yourdate(activity.to_date)}
            </Typography>
          </CardActions>
        </Card>
      )}
    </React.Fragment>
  );
};
ActivityItem.propTypes = {
  show: PropTypes.func.isRequired,
};

export default withRouter(ActivityItem);
