import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableContainer,
  Paper,
} from "@material-ui/core";
import { state, yourdate } from "common/decorator";
const BySectionTable = (props) => {
  const { data } = props;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>DNI</TableCell>
            <TableCell>Nombre y Apellidos</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Celular</TableCell>
            <TableCell>Cumpleaños</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow hover key={item.code}>
              <TableCell>{item.student_dni}</TableCell>
              <TableCell>{`${item.student.name} ${item.student.surname} ${item.student.second_surname}`}</TableCell>
              <TableCell>{state[item.state]}</TableCell>
              <TableCell>{item.student.telephone}</TableCell>
              <TableCell>{yourdate(item.student.birthdate)}</TableCell>
              <TableCell>
                <Button color="primary" size="small" variant="contained">
                  Calificaciones
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

BySectionTable.propTypes = {
  data: PropTypes.array.isRequired,
};

export default BySectionTable;
