import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  inner: {
    minWidth: 1050
  }
}));

const CoursesTable = props => {
  const { className, courses, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
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
                  <TableRow className={classes.tableRow} hover key={item.code}>
                    <TableCell>
                      {item.section.degree.cycle.branch.name}
                    </TableCell>
                    <TableCell>{item.course.name}</TableCell>
                    <TableCell>{item.section.degree.cycle.title}</TableCell>
                    <TableCell>{item.section.degree.code.substr(-2)}</TableCell>
                    <TableCell>15</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

CoursesTable.propTypes = {
  className: PropTypes.string,
  courses: PropTypes.array.isRequired
};

export default CoursesTable;
