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
const RegistersTable = ({ registers, handleDownload, handleRev }) => {
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
                <b>{item.student.fullname}</b>
              </TableCell>
              {item.responses.length ? (
                <React.Fragment>
                  <TableCell>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() =>
                        handleDownload(item.code, item.responses[0].attached)
                      }
                    >
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
                <IconButton
                  style={{ color: "#2bb900" }}
                  size="small"
                  onClick={() => handleRev(item)}
                >
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
  handleDownload: PropTypes.func,
  handleRev: PropTypes.func,
};
export default RegistersTable;
