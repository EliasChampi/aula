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
import moment from "common/moment"
import { state } from "common/decorator"
const BySectionTable = props => {
  const { data } = props;

  return (
    <PerfectScrollbar>
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
          {data.map(item => (
            <TableRow hover key={item.code}>
              <TableCell>{item.student_dni}</TableCell>
              <TableCell>{`${item.student.name} ${item.student.surname} ${item.student.second_surname}`}</TableCell>
              <TableCell>{state[item.state]}</TableCell>
              <TableCell>{item.student.telephone}</TableCell>
              <TableCell>{moment(item.student.birthdate).format("DD [de] MMMM")}</TableCell>
              <TableCell>
                <Button color="primary" size="small" variant="contained">
                  Notas
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </PerfectScrollbar>
  );
};

BySectionTable.propTypes = {
  data: PropTypes.array.isRequired
};

export default BySectionTable;
