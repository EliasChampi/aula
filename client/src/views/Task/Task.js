import React, { useContext } from "react";
import { TaskItem } from "./components";
import { ToastContext } from "context/toast";
import { Title } from "components";
import { Card, CardContent, Typography } from "@material-ui/core";

const Task = ({ match, history }) => {
  const {
    params: { code },
  } = match;
  const { show } = useContext(ToastContext);
  const handleBackClick = () => {
    history.goBack();
  };
  return (
    <React.Fragment>
      <TaskItem code={code} show={show} handleBackClick={handleBackClick} />
      <Title title="Desarrollo del tarea" />
      <Card>
        <CardContent>
          <Typography variant="h2">Aqui van los estados</Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default Task;
