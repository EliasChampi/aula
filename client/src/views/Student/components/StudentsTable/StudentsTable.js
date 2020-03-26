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

const StudentsTable = props => {
  const { students } = props;
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
                  <TableCell>DNI</TableCell>
                  <TableCell>Estudiante</TableCell>
                  <TableCell>Año</TableCell>
                  <TableCell>Nivel</TableCell>
                  <TableCell>Grado y Sección</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {students.map(item => (
                  <TableRow className={classes.tableRow} hover key={item.code}>
                    <TableCell>{item.student_dni}</TableCell>
                    <TableCell>
                      {`${item.student.name} ${item.student.surname} ${item.student.second_surname}`}
                    </TableCell>
                    <TableCell>{item.section.code.substr(0, 4)}</TableCell>
                    <TableCell>{item.section.degree.cycle.title}</TableCell>
                    <TableCell>{item.section.code.substr(-2)}</TableCell>
                    <TableCell>{item.state}</TableCell>
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

StudentsTable.propTypes = {
  className: PropTypes.string,
  students: PropTypes.array.isRequired
};

export default StudentsTable;
