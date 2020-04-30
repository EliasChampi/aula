import React, { useState, useEffect, useContext } from "react";
import Operative from "views/Wrapper/Operative";
import {
  Divider,
  Button,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Tabs,
  Tab,
} from "@material-ui/core";
import { ActivitiesTable, CreateDialog, NewCard } from "./components";
import unitApi from "service/unit";
import api from "service/activity";
import { ToastContext } from "context/toast";
import moment from "common/moment";
import { yourdate } from "common/decorator";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  media: {
    height: "15em",
  },
  content: {
    marginTop: theme.spacing(3),
  },
}));

const ByUnit = (props) => {
  const [prioriActivities, setPrioriActivities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selected, setSelected] = useState({});
  const [tab, setTab] = React.useState("priori");
  const [unit, setUnit] = useState({});
  const [open, setOpen] = useState(false);
  const { show } = useContext(ToastContext);
  const classes = useStyles();
  const {
    match: {
      params: { code, section_code },
    },
    history,
  } = props;

  const RightButton = () => (
    <Button
      color="secondary"
      variant="contained"
      onClick={() => {
        setOpen(true);
      }}
    >
      Crear nueva Actividad
    </Button>
  );

  const handleEdit = (item) => {
    setSelected(item);
    setOpen(true);
  };

  const handleCaliClick = (code) => {
    history.push(`/calificaciones/${section_code}/${code}`);
  };

  const handleClose = (mode = "canceled") => {
    setOpen(false);
    setSelected({});
    if (mode === "saved") {
      fetchData(true);
    }
  };

  const fetchData = (mounted) => {
    unitApi
      .fetchByCode(code)
      .then((r) => {
        if (mounted) {
          setUnit(r.value);
          api.fetchByUnit(code).then((res) => {
            const now = moment().format("YYYY-MM-DD");
            let ts = [];
            let pts = [];
            res.values.forEach((item) => {
              if (now > moment(item.to_date).format("YYYY-MM-DD")) {
                ts.push(item);
              } else {
                pts.push(item);
              }
            });
            setActivities(ts);
            setPrioriActivities(pts);
          });
        }
      })
      .catch((error) => {
        show(error.message || error, "error");
      });
  };

  useEffect(() => {
    let mounted = true;
    fetchData(mounted);
    return () => {
      mounted = false;
    };
  }, []);

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Operative
      title="Listado de actividades de la unidad"
      RightButton={RightButton}
    >
      <Card>
        <CardMedia
          className={classes.media}
          component="img"
          image="/images/mibg.svg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Unidad: {unit.name}
          </Typography>
          <Typography variant="subtitle2">{unit.description}</Typography>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="on"
          >
            <Tab value="priori" label="Actividades por entregar" />
            <Tab value="activities" label="Actividades ya entregados" />
          </Tabs>
          <Divider />
          <div className={classes.content}>
            {tab === "priori" && (
              <Grid container spacing={3}>
                {prioriActivities.map((item, index) => (
                  <Grid item key={index}>
                    <NewCard
                      title={item.title}
                      to_date={`Para ${yourdate(item.to_date)}`}
                      handleEdit={() => handleEdit(item)}
                      handleCaliClick={() => handleCaliClick(item.code)}
                    />
                  </Grid>
                ))}
              </Grid>
            )}
            {tab === "activities" && (
              <ActivitiesTable
                activities={activities}
                handleCaliClick={handleCaliClick}
              />
            )}
          </div>
        </CardContent>
      </Card>
      <CreateDialog
        open={open}
        u_code={code}
        selected={selected}
        handleClose={handleClose}
      />
    </Operative>
  );
};

export default ByUnit;
