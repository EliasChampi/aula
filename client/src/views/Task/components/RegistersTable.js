import React from "react";
import PropTypes from "prop-types";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  TableBody,
  IconButton,
} from "@material-ui/core";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
const RegistersTable = ({ registers }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>DNI</TableCell>
            <TableCell>Estudiante</TableCell>
            <TableCell>Adjunto</TableCell>
            <TableCell>Nota</TableCell>
            <TableCell>Revisar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {registers.map((item) => (
            <TableRow>
              <TableCell>{item.student_dni}</TableCell>
              <TableCell>
                {`${item.student.name} ${item.student.surname} ${item.student.second_surname}`}
              </TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell>
                <IconButton>
                  <AssignmentTurnedInIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
RegistersTable.propTypes = {
  registers: PropTypes.array.isRequired,
};
export default RegistersTable;
