import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Button
} from "@material-ui/core";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const LearnsTable = props => {
  const { learns } = props;
  return (
    <PerfectScrollbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Codigo</TableCell>
            <TableCell>Titulo</TableCell>
            <TableCell>Trimestre</TableCell>
            <TableCell>Fecha de Creación</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {learns.map(item => (
            <TableRow hover key={item.code}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.trim}</TableCell>
              <TableCell>{item.created_at}</TableCell>
              <TableCell>
                <Button
                  component={Link}
                  size="small"
                  color="primary"
                  variant="contained"
                  to={"/estudiantes-por-seccion/" + item.section_code}
                >
                  Ver Tareas
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
  learns: PropTypes.array.isRequired
};

export default LearnsTable;
