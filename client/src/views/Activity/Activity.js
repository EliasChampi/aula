import React, { useContext } from "react";
import { ActivityItem, FamilyCard } from "./components";
import { ToastContext } from "context/toast";
import { Title } from "components";

const Activity = ({ match, history }) => {
  const {
    params: { register_code, code },
  } = match;
  const { show } = useContext(ToastContext);

  const handleBackClick = () => {
    history.goBack();
  };
  return (
    <React.Fragment>
      <ActivityItem code={code} show={show} handleBackClick={handleBackClick} />
      <Title title="Desarrollo del Actividad" />
      <FamilyCard show={show} register_code={register_code} code={code} />
    </React.Fragment>
  );
};

export default Activity;
