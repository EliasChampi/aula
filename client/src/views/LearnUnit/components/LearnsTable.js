import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Button,
} from "@material-ui/core";
import PropTypes from "prop-types";
import moment from "common/moment";
const LearnsTable = (props) => {
  const { learns, handleEdit, handleTask } = props;
  return (
    <PerfectScrollbar>
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
              <TableCell>
                {moment(item.created_at).format("DD [de] MMMM [del] YYYY")}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={() => handleTask(item)}
                >
                  Ver Tareas
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
    </PerfectScrollbar>
  );
};

LearnsTable.propTypes = {
  learns: PropTypes.array.isRequired,
  handleEdit: PropTypes.func,
  handleTask: PropTypes.func,
};

export default LearnsTable;
