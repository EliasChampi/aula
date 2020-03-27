import React from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from "@material-ui/core";

const CoursesTable = props => {
  const { courses } = props;

  return (
    <PerfectScrollbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Sede</TableCell>
            <TableCell>Curso</TableCell>
            <TableCell>Nivel</TableCell>
            <TableCell>Grado y Sección</TableCell>
            <TableCell>Cantidad de Estudiantes</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {courses.map(item => (
            <TableRow hover key={item.code}>
              <TableCell>{item.section.degree.cycle.branch.name}</TableCell>
              <TableCell>{item.course.name}</TableCell>
              <TableCell>{item.section.degree.cycle.title}</TableCell>
              <TableCell>{item.section.code.substr(-2)}</TableCell>
              <TableCell>15</TableCell>
              <TableCell>
                <Button
                  component={Link}
                  size="small"
                  color="primary"
                  variant="contained"
                  to={"/estudiantes-por-seccion/"+item.section_code}
                >
                  Estudiantes
                </Button>
                <Button size="small" variant="contained">
                  Temas
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PerfectScrollbar>
  );
};

CoursesTable.propTypes = {
  courses: PropTypes.array.isRequired
};

export default CoursesTable;
