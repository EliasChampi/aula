import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TableContainer,
  Paper,
} from "@material-ui/core";
import moment from "moment";
import { yourdate } from "common/decorator";
const TasksTable = ({ tasks, handleCaliClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Codigo</TableCell>
            <TableCell>Titulo</TableCell>
            <TableCell>Fecha de Entrega</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((item) => (
            <TableRow hover key={item.code}>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{yourdate(item.to_date)}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  onClick={() => handleCaliClick(item.code)}
                  color="primary"
                  size="small"
                >
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

TasksTable.propTypes = {
  tasks: PropTypes.array.isRequired,
  handleCaliClick: PropTypes.func,
};
export default TasksTable;
