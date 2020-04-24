import React, { useContext } from "react";
import { TaskItem } from "../Task/components";
import { TeacherCard } from "./components";
import { ToastContext } from "context/toast";
import { Title } from "components";

const Calification = ({ match, history }) => {
  const {
    params: { section_code, code },
  } = match;
  const { show } = useContext(ToastContext);
  const handleBackClick = () => {
    history.goBack();
  };
  return (
    <React.Fragment>
      <TaskItem code={code} show={show} handleBackClick={handleBackClick} />
      <Title title="Estudiantes" />
      <TeacherCard show={show} section_code={section_code} code={code} />
    </React.Fragment>
  );
};

export default Calification;
