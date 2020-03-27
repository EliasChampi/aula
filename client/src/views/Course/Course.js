import React, { useState, useEffect, useContext } from "react";
import { CoursesTable } from "./components";
import api from "../../service/course";
import { AuthContext } from "context/auth";
import { ToastContext } from "context/toast";
import { Card, CardContent, CardHeader, Divider } from "@material-ui/core";

const Course = () => {
  const { user } = useContext(AuthContext);
  const { show } = useContext(ToastContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    api
      .fetchByTeacher(user.dni)
      .then(r => {
        setCourses(r.values);
      })
      .catch(err => {
        show(err.message, "error");
      });
  }, []);

  return (
    <Card>
      <CardHeader subheader="Listado de cursos que esta dictando en el presente año" title="Cursos y Secciónes" />
      <Divider />
      <CardContent>
        <CoursesTable courses={courses} />
      </CardContent>
    </Card>
  );
};

export default Course;
