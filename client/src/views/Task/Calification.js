import React, { useContext } from "react";
import { TaskItem, RegistersTable } from "./components";
import { ToastContext } from "context/toast";
import { Title } from "components";

const Calification = ({ match, history }) => {
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
      <Title title="Estudiantes" />
      <RegistersTable />
    </React.Fragment>
  );
};

export default Calification;
