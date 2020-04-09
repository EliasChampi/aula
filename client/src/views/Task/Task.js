import React, { useState, useEffect, useContext } from "react";
import Operative from "views/Wrapper/Operative";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Button,
  List,
  Typography,
} from "@material-ui/core";
import { TasksTable } from "./components";
import learnapi from "service/learnunit";
import api from "service/task";
import { ToastContext } from "context/toast";
import NewItems from "./components/NewItems";
import moment from "common/moment";
import CreateDialog from "./components/CreateDialog";
const Task = (props) => {
  const [prioriTasks, setPrioriTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selected, setSelected] = useState({});
  const [learn, setLearn] = useState({});
  const [open, setOpen] = useState(false);
  const { show } = useContext(ToastContext);
  const {
    match: {
      params: { code },
    },
  } = props;

  const RightButton = () => (
    <Button
      variant="contained"
      color="primary"
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
      <Card>
        <CardHeader title={learn.name} subheader={learn.description} />
        <Divider />
        <CardContent>
          <Typography variant="subtitle2" component="b">
            Tareas por entregar
          </Typography>
          <List>
            {prioriTasks.map((item, index) => (
              <NewItems
                key={index}
                primaryText={item.title}
                handleEdit={() => handleEdit(item)}
                secondaryText={`Para ${moment(item.to_date).format(
                  "DD [de] MMMM"
                )}`}
              />
            ))}
          </List>
          <Typography variant="subtitle2" component="b">
            Tareas ya entregados
          </Typography>
          <TasksTable tasks={tasks} />
        </CardContent>
      </Card>
      <CreateDialog
        open={open}
        l_code={code}
        selected={selected}
        handleClose={handleClose}
      />
    </Operative>
  );
};

export default Task;
