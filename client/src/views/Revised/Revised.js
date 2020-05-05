import React, { useContext } from "react";
import { Button } from "@material-ui/core";

import { RevisedTable } from "./components";
import Student from "views/Wrapper/Student";
import { ToastContext } from "context/toast";

const Revised = ({ match, history }) => {
  const {
    params: { register_code },
  } = match;

  const { show } = useContext(ToastContext);

  return (
    <Student
      register_code={register_code}
      title="Actividades calificados del estudiante"
      RightButton={
        <Button variant="contained" onClick={() => history.goBack()}>
          Volver
        </Button>
      }
    >
      <RevisedTable show={show} />
    </Student>
  );
};

export default Revised;
