import React, { useState } from "react";
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
                  <TableCell>Curso</TableCell>
                  <TableCell>Nivel</TableCell>
                  <TableCell>Grado</TableCell>
                  <TableCell>Sección</TableCell>
                  <TableCell>Cantidad de Estudiantes</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map(item => (
                  <TableRow className={classes.tableRow} hover key={item.code}>
                    <TableCell>{item.course}</TableCell>
                    <TableCell>{item.level}</TableCell>
                    <TableCell>{item.degree}</TableCell>
                    <TableCell>{item.section}</TableCell>
                    <TableCell>{item.students_count}</TableCell>
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
