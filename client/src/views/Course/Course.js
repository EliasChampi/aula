import React, { useState, useEffect, useContext } from "react";
import { CoursesTable } from "./components";
import api from "service/course";
import { AuthContext } from "context/auth";
import { ToastContext } from "context/toast";
import { Card, CardContent, CardHeader, Divider } from "@material-ui/core";
import cache from "helpers/cache";

const Course = props => {
  const { user } = useContext(AuthContext);
  const { show } = useContext(ToastContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchCourses = () => {
      api
        .fetchByTeacher(user.dni)
        .then(r => {
          if (mounted) {
            setCourses(r.values);
          }
        })
        .catch(err => {
          show(err.message, "error");
        });
    };
    fetchCourses();
    return () => {
      mounted = false;
    };
  }, []);

  const handleAction = (from, item) => {
    const key = `op_${item.code}_sec_${item.section_code}`;
    if (!cache.hasThis(key)) {
      cache.setItem(key, item);
    }
    props.history.push(`${from}/${item.section_code}/${item.code}`);
  }

  return (
    <Card>
      <CardHeader
        subheader="Listado de cursos que esta dictando en el presente año"
        title="Cursos y Secciónes"
      />
      <Divider />
      <CardContent>
        <CoursesTable courses={courses} handleAction={handleAction}/>
      </CardContent>
    </Card>
  );
};

export default Course;
