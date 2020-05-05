import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  IconButton,
} from "@material-ui/core";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import { state, yourdate } from "common/decorator";
const BySectionTable = ({ data, handleGo }) => {

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
            <TableCell>Calificaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow hover key={item.code}>
              <TableCell>{item.student_dni}</TableCell>
              <TableCell>{item.student.fullname}</TableCell>
              <TableCell>{state[item.state]}</TableCell>
              <TableCell>{item.student.telephone}</TableCell>
              <TableCell>{yourdate(item.student.birthdate)}</TableCell>
              <TableCell>
                <IconButton
                  color="secondary"
                  size="small"
                  onClick={() => handleGo(item)}
                >
                  <PlaylistAddCheckIcon />
                </IconButton>
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
  handleGo: PropTypes.func.isRequired
};

export default BySectionTable;
