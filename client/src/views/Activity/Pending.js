import React, { useState, useEffect, useContext } from "react";
import { Button, Grid } from "@material-ui/core";
import activityApi from "service/activity";
import { ActivityCard } from "./components";
import { ToastContext } from "context/toast";
import Student from "views/Wrapper/Student";
import { Link } from "react-router-dom";
const Pending = ({ match, history }) => {
  const {
    params: { dni, section_code, register_code },
  } = match;
  const [activities, setActivities] = useState([]);
  const { show } = useContext(ToastContext);
  const RightButton = () => (
    <Button
      variant="contained"
      color="primary"
      component={Link}
      to={`/revisados/${dni}/${register_code}`}
    >
      Revisados
    </Button>
  );
  useEffect(() => {
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
  }, []);

  const handleCaliClick = (code) => {
    history.push(`/actividad/${dni}/${register_code}/${code}`);
  };

  return (
    <Student
      title="Actividades pendientes del Estudiante"
      dni={dni}
      show={show}
      RightButton={RightButton}
    >
      <Grid container spacing={2}>
        {activities.map((item) => (
          <Grid item key={item.code}>
            <ActivityCard
              activity={item}
              handleCaliClick={() => handleCaliClick(item.code)}
            />
          </Grid>
        ))}
      </Grid>
    </Student>
  );
};

export default Pending;
