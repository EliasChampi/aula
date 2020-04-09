import React from "react";
import { CoursesTable, Header } from "./components";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button
} from "@material-ui/core";
import cache from "helpers/cache";
import { Link } from "react-router-dom";
import WithCourses from "../../components/hoc/withCourses";
import { dayname } from "common";

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
      color="primary"
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
      <Card>
        <CardHeader subheader="" title="Cursos y Secciónes" />
        <Divider />
        <CardContent>
          <CoursesTable courses={courses} handleAction={handleAction} />
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

export default WithCourses(Course);
