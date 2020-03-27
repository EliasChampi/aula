import React from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from "@material-ui/core";

const StudentsTable = props => {
  const { students } = props;
  return (
    <PerfectScrollbar>
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
            <TableRow hover key={item.code}>
              <TableCell>{item.student_dni}</TableCell>
              <TableCell>
                {`${item.student.name} ${item.student.surname} ${item.student.second_surname}`}
              </TableCell>
              <TableCell>{item.section.code.substr(0, 4)}</TableCell>
              <TableCell>{item.section.degree.cycle.title}</TableCell>
              <TableCell>{item.section.code.substr(-2)}</TableCell>
              <TableCell>{item.state}</TableCell>
              <TableCell>
                <Button size="small" variant="contained" color="primary">
                  Ver Tareas
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PerfectScrollbar>
  );
};

StudentsTable.propTypes = {
  students: PropTypes.array.isRequired
};

export default StudentsTable;
