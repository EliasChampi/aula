import React, { useState, useEffect, useContext } from "react";
import { Header } from "components";
import { Button, Grid } from "@material-ui/core";
import stuApi from "service/student";
import taskApi from "service/task";
import { TaskCard } from "./components";
import { ToastContext } from "context/toast";
const Pending = ({ match, history }) => {
  const {
    params: { dni, section_code },
  } = match;

  const [student, setStudent] = useState({});
  const [tasks, setTasks] = useState([]);
  const { show } = useContext(ToastContext);
  const RightButton = () => (
    <Button variant="contained" color="primary">
      My Button
    </Button>
  );

  useEffect(() => {
    let mounted = true;
    const fetchStudent = () => {
      stuApi
        .fetchByCode(dni)
        .then((r) => {
          if (mounted) {
            setStudent(r.value);
          }
        })
        .catch((error) => {
          show(error.message || error, "error");
        });
    };

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

    fetchStudent();
    fetchTasks();
    return () => {
      mounted = false;
    };
  }, []);

  const handleCaliClick = (code) => {
    history.push(`/calificaciones/${section_code}/${code}`);
  };

  return (
    <React.Fragment>
      <Header
        title="Tareas del Estudiante"
        subtitle={`${student.name} ${student.surname} ${student.second_surname}`}
        RightButton={RightButton}
      />

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
    </React.Fragment>
  );
};

export default Pending;
