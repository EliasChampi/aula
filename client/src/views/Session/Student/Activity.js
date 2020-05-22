import React, { useState, useEffect, useContext } from "react";
import { Button, Grid } from "@material-ui/core";

import activityApi from "service/activity";
import { Mytab, NewCard } from "../components";
import { ToastContext } from "context/toast";
import Student from "views/Wrapper/Student";
import { RevisedTable } from "views/Revised/components";
import { Empty } from "components";
import { cycleTypes } from "common/decorator.js";
const Activity = ({ match, history }) => {
  const {
    params: { code },
  } = match;
  const [activities, setActivities] = useState([]);
  const { show } = useContext(ToastContext);

/*   useEffect(() => {
    let mounted = true;
    const fetchActivities = () => {
      activityApi
        .fetchBySec(section_code)
        .then((r) => {
          if (mounted) {
            setActivities(r.values);
          }
        })
        .catch((error) => {
          show(error.message || error, "error");
        });
    };
    fetchActivities();
    return () => {
      mounted = false;
    };
  }, [section_code]); */

  const Priories = () =>
    activities.length ? (
      {/* <Grid container spacing={2}>
        {activities.map((item) => (
          <Grid item key={item.code}>
            <NewCard
              activity={item}
              handleCaliClick={() => {
                history.push(
                  `/actividad/${section_code}/${register_code}/${item.code}`
                );
              }}
            />
          </Grid>
        ))}
      </Grid> */}
    ) : (
      <Empty title="No hay actividades por hoy" />
    );

  const Activities = () => <RevisedTable show={show} />;

  return (
    <div>hola mundo</div>
/*     <Student
      title="Actividades del Estudiante"
      register_code="MICODE"
      show={show}
      RightButton={
        <Button variant="contained" onClick={() => history.goBack()}>
          Volver
        </Button>
      }
    >
      <Mytab
        title={`Seleccionaste matrícula: `}
        subtitle="Se mostrarán actividades solo del año Seleccionado"
        Priories={Priories}
        Activities={Activities}
      />
    </Student> */
  );
};

export default Activity;
