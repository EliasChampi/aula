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
  IconButton,
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import PropTypes from "prop-types";
import { mydate } from "common/decorator";
const LearnsTable = (props) => {
  const { learns, handleEdit, handleTask } = props;
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Modificar</TableCell>
            <TableCell>Codigo</TableCell>
            <TableCell>Trimestre</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Fecha de Creación</TableCell>
            <TableCell>Tareas</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {learns.map((item) => (
            <TableRow hover key={item.code}>
              <TableCell>
                <IconButton
                  onClick={() => handleEdit(item)}
                  color="secondary"
                  size="small"
                >
                  <CreateIcon />
                </IconButton>
              </TableCell>
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
