import React, { useContext } from "react";

import { ActivityItem } from "../Activity/components";
import { TeacherCard } from "./components";
import { ToastContext } from "context/toast";
import { Title } from "components";

const Calification = ({ match }) => {
  const {
    params: { section_code, code },
  } = match;
  const { show } = useContext(ToastContext);

  return (
    <React.Fragment>
      <ActivityItem show={show} />
      <Title title="Estudiantes" />
      <TeacherCard show={show} section_code={section_code} code={code} />
    </React.Fragment>
  );
};

export default Calification;
