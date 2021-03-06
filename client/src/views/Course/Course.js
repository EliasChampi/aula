import React from "react";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";

import { CourseCard } from "./components";
import { withCourses, Header, Empty } from "components";
import { dayname } from "common/utils";
import cache from "helpers/cache";

const Course = ({ courses, history, user }) => {
  const handleAction = (from, item) => {
    const key = `op_${item.code}_sec_${item.section_code}`;
    if (!cache.hasThis(key)) {
      cache.setItem(key, item);
    }
    history.push(`${from}/${item.section_code}/${item.code}`);
  };

  return (
    <React.Fragment>
      <Header
        subtitle="Aqui estan las secciones que estas dictando este año"
        title={dayname(user.name)}
        RightButton={
          <Button
            variant="contained"
            color="secondary"
            component={Link}
            to="/crear_unidad"
          >
            Crear una unidad
          </Button>
        }
      />
      {courses.length ? (
        <Grid container spacing={3}>
          {courses.map((item) => (
            <Grid item key={item.code}>
              <CourseCard course={item} handleAction={handleAction} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Empty title="Aún no tienes un horario establecido" />
      )}
    </React.Fragment>
  );
};

export default withCourses(Course);
