import React, { useState, useEffect, useContext } from "react";
import { Button, Grid } from "@material-ui/core";
import taskApi from "service/task";
import { TaskCard } from "./components";
import { ToastContext } from "context/toast";
import Student from "views/Wrapper/Student";
import { Link } from "react-router-dom";
const Pending = ({ match, history }) => {
  const {
    params: { dni, section_code, register_code },
  } = match;
  const [tasks, setTasks] = useState([]);
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
    const fetchTasks = () => {
      taskApi
        .fetchBySec(section_code)
        .then((r) => {
          if (mounted) {
            setTasks(r.values);
          }
        })
        .catch((error) => {
          show(error.message || error, "error");
        });
    };
    fetchTasks();
    return () => {
      mounted = false;
    };
  }, []);

  const handleCaliClick = (code) => {
    history.push(`/tarea/${dni}/${register_code}/${code}`);
  };

  return (
    <Student
      title="Tareas pendientes del Estudiante"
      dni={dni}
      show={show}
      RightButton={RightButton}
    >
      <Grid container spacing={3}>
        {tasks.map((item) => (
          <Grid item key={item.code}>
            <TaskCard
              task={item}
              handleCaliClick={() => handleCaliClick(item.code)}
            />
          </Grid>
        ))}
      </Grid>
    </Student>
  );
};

export default Pending;
