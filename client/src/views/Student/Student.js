import React, { useState, useEffect, useContext } from "react";
import { Grid, Button } from "@material-ui/core";

import { CourseCard } from "./components";
import { AuthContext } from "context/auth";
import api from "service/operative";
import { ToastContext } from "context/toast";
import { Header, Empty } from "components";
import { dayname } from "common/utils";
import cache from "helpers/cache";
import { cycleTypes } from "common/decorator";
import { OPERATIVE } from "constants/cache";
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
        .fetchBySection(section_code)
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
  }, [section_code]);

  const handleActivityClick = (item) => {
    cache.setItem(OPERATIVE + item.code, item);
    history.push("/mis-actividades/" + item.code);
  };

  return (
    <React.Fragment>
      <Header
        subtitle={`Estas son tus areas de 
        ${section_code.substr(-2)} de 
        ${cycleTypes[section_code.substr(4, 3)]}`}
        title={dayname(user.name)}
        RightButton={
          <Button variant="contained" color="secondary">
            Mi Asistencia
          </Button>
        }
      />
      {courses.length ? (
        <Grid container spacing={3}>
          {courses.map((item) => (
            <Grid item key={item.code}>
              <CourseCard item={item} onActivityClick={handleActivityClick} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Empty title="Aún no se ha establecido tu horario" />
      )}
    </React.Fragment>
  );
};
export default Student;
