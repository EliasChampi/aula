import React, { useContext, useState, useEffect } from "react";
import { TaskItem, RegistersTable } from "./components";
import { ToastContext } from "context/toast";
import { Title } from "components";
import register from "service/register";

const Calification = ({ match, history }) => {
  const {
    params: { section_code, code },
  } = match;
  const { show } = useContext(ToastContext);
  const [registers, setRegisters] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchRegisters = () => {
      register
        .fetchBySectionWithResponse(section_code, code)
        .then((r) => {
          if (mounted) {
            setRegisters(r.values);
          }
        })
        .catch((error) => {
          show(error.message || error, "error");
        });
    };
    fetchRegisters();
    return () => {
      mounted = false;
    };
  }, []);

  const handleBackClick = () => {
    history.goBack();
  };
  return (
    <React.Fragment>
      <TaskItem code={code} show={show} handleBackClick={handleBackClick} />
      <Title title="Estudiantes" />
      <RegistersTable registers={registers} />
    </React.Fragment>
  );
};

export default Calification;
