import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "context/auth";
import api from "service/student";
import regApi from "service/register";
import { ToastContext } from "context/toast";
import {
  Grid,
  Button,
} from "@material-ui/core";
import { Header } from "components";
import { dayname } from "common/utils";
import { StudentCard } from "./components";
const Student = () => {
  const { user } = useContext(AuthContext);
  const { show } = useContext(ToastContext);
  const [students, setStudents] = useState([]);
  const [regs, setRegs] = useState([]);
  const [selected, setSelected] = useState("");

  const RightButton = () => (
    <Button color="secondary" variant="contained">
      My Button
    </Button>
  );
  const handleExpandedClick = (dni) => {
    regApi
      .fetchByStudent(dni)
      .then((r) => {
        setRegs(r.values);
        setSelected(dni);
      })
      .catch((err) => {
        show(err.message, "error");
      });
  };
  useEffect(() => {
    let mounted = true;
    const fetchStudents = () => {
      api
        .fetchByFamily(user.dni)
        .then((r) => {
          if (mounted) {
            setStudents(r.values);
          }
        })
        .catch((err) => {
          show(err.message, "error");
        });
    };
    fetchStudents();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <React.Fragment>
      <Header
        subtitle="Aqui estan tus estudiantes registrados"
        title={dayname(user.name)}
        RightButton={RightButton}
      />
      <Grid container spacing={3}>
        {students.map((item) => (
          <Grid item key={item.dni}>
            <StudentCard
              student={item}
              selected={selected}
              regs={regs}
              handleExpandedClick={() => handleExpandedClick(item.dni)}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};
export default Student;
