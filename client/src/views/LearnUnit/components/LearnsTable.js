import React from "react";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Button,
  TableContainer,
  Paper,
} from "@material-ui/core";
import PropTypes from "prop-types";
import { mydate } from "common/decorator";
const LearnsTable = (props) => {
  const { learns, handleEdit, handleTask } = props;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Codigo</TableCell>
            <TableCell>Trimestre</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Fecha de Creación</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {learns.map((item) => (
            <TableRow hover key={item.code}>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.trim}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{mydate(item.created_at)}</TableCell>
              <TableCell>
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  onClick={() => handleTask(item)}
                >
                  Tareas
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleEdit(item)}
                >
                  Modificar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

LearnsTable.propTypes = {
  learns: PropTypes.array.isRequired,
  handleEdit: PropTypes.func,
  handleTask: PropTypes.func,
};

export default LearnsTable;
