import React, { useState, useEffect, useContext } from "react";
import Operative from "views/Wrapper/Operative";
import { Divider, Button, Typography, Grid } from "@material-ui/core";
import { TasksTable, CreateDialog, NewCard } from "./components";
import learnapi from "service/learnunit";
import api from "service/task";
import { ToastContext } from "context/toast";
import moment from "common/moment";
import { yourdate } from "common/decorator";
import { Title } from "components";
const TasksByUnit = (props) => {
  const [prioriTasks, setPrioriTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState({});
  const [learn, setLearn] = useState({});
  const [open, setOpen] = useState(false);
  const { show } = useContext(ToastContext);
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
      Crear nueva Tarea
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
    learnapi
      .fetchByCode(code)
      .then((r) => {
        if (mounted) {
          setLearn(r.value);
          api.fetchByLearn(code).then((res) => {
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
            setTasks(ts);
            setPrioriTasks(pts);
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

  return (
    <Operative title="Listado de tareas de la unidad" RightButton={RightButton}>
      <Typography variant="h5" color="textSecondary">
        Unidad: {learn.name}
      </Typography>
      <Typography variant="subtitle2">{learn.description}</Typography>
      <Divider />
      {prioriTasks.length > 0 && (
        <React.Fragment>
          <Title title="Tareas por Entregar" />
          <Grid container spacing={3}>
            {prioriTasks.map((item, index) => (
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
        </React.Fragment>
      )}
      <Title title="Tareas ya entregados" />
      <TasksTable tasks={tasks} handleCaliClick={handleCaliClick} />

      <CreateDialog
        open={open}
        l_code={code}
        selected={selected}
        handleClose={handleClose}
      />
    </Operative>
  );
};

export default TasksByUnit;
