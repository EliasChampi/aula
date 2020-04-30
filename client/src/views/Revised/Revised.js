import React, { useContext } from "react";
import Student from "views/Wrapper/Student";
import { ToastContext } from "context/toast";
import { Button } from "@material-ui/core";

const Revised = ({ match, history }) => {
  const {
    params: { dni },
  } = match;

  const RightButton = () => (
    <Button variant="contained" onClick={() => history.goBack()}>
      Atras
    </Button>
  );
  const { show } = useContext(ToastContext);
  return (
    <Student
      dni={dni}
      show={show}
      title="Actividades revisados del estudiante"
      RightButton={RightButton}
    >
      hello world
    </Student>
  );
};

export default Revised;
