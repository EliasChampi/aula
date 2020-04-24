import React from "react";
import { CourseCard } from "./components";
import { withCourses, Header } from "components";
import { Button, Grid } from "@material-ui/core";
import { Link } from "react-router-dom";
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

  const RightButton = () => (
    <Button
      variant="contained"
      color="secondary"
      component={Link}
      to="/crear_unidad"
    >
      Crear una unidad
    </Button>
  );

  return (
    <React.Fragment>
      <Header
        subtitle="Aqui estan las secciones que estas dictando este año"
        title={dayname(user.name)}
        RightButton={RightButton}
      />
      <Grid container spacing={3}>
        {courses.map((item) => (
          <Grid item key={item.code}>
            <CourseCard course={item} handleAction={handleAction} />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default withCourses(Course);
