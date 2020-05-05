import React, { useState, useEffect, useContext, useCallback } from "react";
import { Button, Grid } from "@material-ui/core";
import {
  ActivitiesTable,
  CreateDialog,
  Mytab,
  ActivityCard,
} from "./components";

import Operative from "views/Wrapper/Operative";
import unitApi from "service/unit";
import api from "service/activity";
import { ToastContext } from "context/toast";
import moment from "common/moment";
import { Empty } from "components";

const ByUnit = (props) => {
  const [prioriActivities, setPrioriActivities] = useState([]);
  const [activities, setActivities] = useState([]);
  const [selected, setSelected] = useState({});
  const [unit, setUnit] = useState({});
  const [open, setOpen] = useState(false);
  const { show } = useContext(ToastContext);
  const {
    match: {
      params: { code, section_code },
    },
    history,
  } = props;

  const handleEdit = (item) => {
    setSelected(item);
    setOpen(true);
  };

  const handleClose = (mode = "canceled") => {
    setOpen(false);
    setSelected({});
    if (mode === "saved") {
      fetchData(true);
    }
  };

  const fetchData = useCallback(
    (mounted) => {
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
    },
    [code]
  );

  useEffect(() => {
    let mounted = true;
    fetchData(mounted);
    return () => {
      mounted = false;
    };
  }, [fetchData]);

  const Priories = () =>
    prioriActivities.length ? (
      <Grid container spacing={3}>
        {prioriActivities.map((item, index) => (
          <Grid item key={index}>
            <ActivityCard
              activity={item}
              foot={
                <React.Fragment>
                  <Button color="primary" onClick={() => handleEdit(item)}>
                    Modificar
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {
                      history.push(
                        `/calificaciones/${section_code}/${item.code}`
                      );
                    }}
                  >
                    Revisar
                  </Button>
                </React.Fragment>
              }
            />
          </Grid>
        ))}
      </Grid>
    ) : (
      <Empty title="Aun no registraste actividades" />
    );

  const Activities = () => (
    <ActivitiesTable
      activities={activities}
      handleCaliClick={(code) => {
        history.push(`/calificaciones/${section_code}/${code}`);
      }}
    />
  );

  return (
    <Operative
      title="Actividades de la Unidad"
      RightButton={
        <Button
          color="secondary"
          variant="contained"
          onClick={() => {
            setOpen(true);
          }}
        >
          Crear nueva Actividad
        </Button>
      }
    >
      <Mytab
        title={`Unidad de Aprendizaje: ${unit.name}`}
        subtitle={unit.description}
        Priories={Priories}
        Activities={Activities}
      />
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
