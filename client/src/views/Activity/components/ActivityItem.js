import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "service/activity";
import { Header } from "components";
import { activityType, yourdate } from "common/decorator";
import { orange } from "@material-ui/core/colors";
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
  Avatar,
  CardMedia,
  CardActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { downloadFile } from "common/utils";
import clsx from "clsx";
const useStyles = makeStyles((theme) => ({
  mt: {
    marginTop: theme.spacing(2),
  },
  avatar: {
    backgroundColor: orange[500],
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
  ml: {
    marginLeft: theme.spacing(2),
  },
}));
const ActivityItem = ({ code, handleBackClick, show }) => {
  const [activity, setActivity] = useState({});
  const [loading, setLoading] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    let mounted = true;
    const fetchActivity = () => {
      api
        .fetchByCodeWithUnit(code)
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
  }, []);

  const RightButton = () => (
    <Button color="secondary" variant="contained" onClick={handleBackClick}>
      Volver a Actividades
    </Button>
  );

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
              <Button
                onClick={handleDownloadClick}
                disabled={!activity.attached}
                variant="contained"
                color="secondary"
                startIcon={<DownloadIcon />}
              >
                Adjunto
              </Button>
            }
            title={`Unidad: ${activity.unit.name}`}
            subheader={activity.unit.description}
          />
          <CardMedia
            component={activity.attached ? "iframe" : "img"}
            height={480}
            src={
              activity.attached
                ? `https://www.youtube.com/embed/${activity.videoid}`
                : "/images/mibg.svg"
            }
            title={activity.title}
          />
          <CardContent className={clsx(classes.dflex, classes.mt)}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <div className={classes.ml}>
              <Typography component="h5" variant="h5">
                Instrucciones
              </Typography>
              <Typography variant="subtitle2">{activity.content}</Typography>
            </div>
          </CardContent>
          <Divider/>
          <CardActions
            className={clsx(classes.padding, classes.dflex, classes.jusAr)}
          >
            <Typography variant="subtitle2">
              <b>Creado el: </b>
              {yourdate(activity.created_at)}
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
  code: PropTypes.string.isRequired,
  show: PropTypes.func.isRequired,
  handleBackClick: PropTypes.func.isRequired,
};

export default ActivityItem;
