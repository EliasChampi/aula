import React, { useState, useEffect, useContext } from "react";
import Operative from "views/Wrapper/Operative";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Button,
  List
} from "@material-ui/core";
import { TasksTable } from "./components";
import learnapi from "service/learnunit";
import api from "service/task";
import { ToastContext } from "context/toast";
import NewItems from "./components/NewItems";
import moment from "common/moment";
const Task = props => {
  const [prioriTasks, setPrioriTasks] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [learn, setLearn] = useState({});
  const { show } = useContext(ToastContext);
  const {
    match: {
      params: { code }
    }
  } = props;
  const RightButton = () => (
    <Button variant="contained" color="primary">
      Crear nueva Tarea
    </Button>
  );

  useEffect(() => {
    let mounted = true;
    const fetchData = () => {
      learnapi
        .fetchByCode(code)
        .then(r => {
          if (mounted) {
            setLearn(r.value);
            api.fetchByLearn(code).then(res => {
              const now = moment().format("YYYY-MM-DD");
              let ts = [];
              let pts = [];
              res.values.forEach(item => {
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
        .catch(error => {
          show(error.message || error, "error");
        });
    };
    fetchData();
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
          <List>
            {prioriTasks.map((item, index) => (
              <NewItems
                key={index}
                primaryText={item.title}
                secondaryText={`Para ${moment(item.to_date).format(
                  "DD [de] MMMM"
                )}`}
              />
            ))}
          </List>
          <TasksTable tasks={tasks} />
        </CardContent>
      </Card>
    </Operative>
  );
};

export default Task;
