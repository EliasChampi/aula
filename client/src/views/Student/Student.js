import React, { useState, useEffect, useContext } from "react";
import StudentTable from "./components/StudentsTable";
import { AuthContext } from "context/auth";
import api from "service/register";
import { ToastContext } from "context/toast";
import { Card, CardContent, CardHeader, Divider } from "@material-ui/core";
import { Header } from "views/Course/components";
import { dayname } from "common";
const Student = () => {
  const { user } = useContext(AuthContext);
  const { show } = useContext(ToastContext);
  const [students, setStudents] = useState([]);

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
        subtitle="Estudiantes de las cuales soy Apoderado"
        title={dayname()}
      />
      <Card>
        <CardHeader
          subheader="Estudiantes de las cuales soy Apoderado"
          title="Listado de Estudiantes"
        />
        <Divider />
        <CardContent>
          <StudentTable students={students} />
        </CardContent>
      </Card>
    </React.Fragment>
  );
};
export default Student;
