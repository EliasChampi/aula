import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@material-ui/core";

import { StudentCard, CourseCard } from "./components";
import { AuthContext } from "context/auth";
import api from "service/operative";
import { ToastContext } from "context/toast";
import { Header, Empty } from "components";
import { dayname } from "common/utils";
import cache from "helpers/cache";
import { cycleTypes } from "common/decorator";
const Student = ({ history }) => {
  const {
    user,
    user: { section_code },
  } = useContext(AuthContext);
  const { show } = useContext(ToastContext);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchCourses = () => {
      api
        .fetchBySection(user.section_code)
        .then((r) => {
          if (mounted) {
            setCourses(r.values);
          }
        })
        .catch((err) => {
          show(err.message, "error");
        });
    };
    fetchCourses();
    return () => {
      mounted = false;
    };
  }, [user]);

  return (
    <React.Fragment>
      <Header
        subtitle={`Estas son tus areas de 
        ${section_code.substr(-2)} de 
        ${cycleTypes[section_code.substr(4, 3)]}`}
        title={dayname(user.name)}
        RightButton={null}
      />
      {courses.length ? (
        <Grid container spacing={3}>
          {courses.map((item) => (
            <Grid item key={item.code}>
              <CourseCard
                teacher={item.teacher}
                course={item.course}
                code={item.code}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Empty title="Aún no hay estudiantes matriculados para mostrar" />
      )}
    </React.Fragment>
  );
};
export default Student;
