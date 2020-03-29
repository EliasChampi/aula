import React, { useState, useEffect, useContext } from "react";
import StudentTable from "./components/StudentsTable";
import { AuthContext } from "context/auth";
import api from "service/register";
import { ToastContext } from "context/toast";
import { Card, CardContent, CardHeader, Divider } from "@material-ui/core";

const Student = () => {
  const { user } = useContext(AuthContext);
  const { show } = useContext(ToastContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    let mounted = true;
    api
      .fetchByFamily(user.dni)
      .then(r => {
        if (mounted) {
          setStudents(r.values);
        }
      })
      .catch(err => {
        show(err.message, "error");
      });
    return () => {
      mounted = false;
    };
  }, []);
  return (
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
  );
};
export default Student;
