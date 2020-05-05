import React, { useContext } from "react";
import { ActivityItem, FamilyCard } from "./components";
import { ToastContext } from "context/toast";
import { Title } from "components";

const Activity = ({ match }) => {
  const {
    params: { register_code, code },
  } = match;
  const { show } = useContext(ToastContext);

  return (
    <React.Fragment>
      <ActivityItem show={show} />
      <Title title="Desarrollo del Actividad" />
      <FamilyCard show={show} register_code={register_code} code={code} />
    </React.Fragment>
  );
};

export default Activity;
