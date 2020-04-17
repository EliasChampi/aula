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
  Button,
  Typography,
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
            <TableRow hover key={item.code}>
              <TableCell>{item.student_dni}</TableCell>
              <TableCell>
                {`${item.student.name} ${item.student.surname} ${item.student.second_surname}`}
              </TableCell>
              {item.responses.length > 0 ? (
                <React.Fragment>
                  <TableCell>
                    <Button variant="contained" size="small">
                      Descargar
                    </Button>
                  </TableCell>
                  <TableCell>{item.responses[0].score}</TableCell>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <React.Fragment>
                    <TableCell>
                      <Typography variant="subtitle2" component="i">
                        Sin respuesta
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2" component="i">
                        No revisado
                      </Typography>
                    </TableCell>
                  </React.Fragment>
                </React.Fragment>
              )}
              <TableCell>
                <IconButton>
                  <AssignmentTurnedInIcon fontSize="small" />
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
