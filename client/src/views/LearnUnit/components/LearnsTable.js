import React from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  IconButton
} from "@material-ui/core";
import CreateIcon from "@material-ui/icons/Create";
import AsignIcon from "@material-ui/icons/Assignment";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import moment from "moment";
const LearnsTable = props => {
  const { learns, handleEdit } = props;
  return (
    <PerfectScrollbar>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Codigo</TableCell>
            <TableCell>Titulo</TableCell>
            <TableCell>Trimestre</TableCell>
            <TableCell>Fecha de Creación</TableCell>
            <TableCell>Ver Tareas</TableCell>
            <TableCell>Modificar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {learns.map(item => (
            <TableRow hover key={item.code}>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.trim}</TableCell>
              <TableCell>
                {moment(item.created_at).format("DD [de] MMMM [del] YYYY")}
              </TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  aria-label="upload picture"
                  component="span"
                >
                  <AsignIcon />
                </IconButton>
              </TableCell>
              <TableCell>
                <IconButton
                  color="primary"
                  aria-label="modificar"
                  component="span"
                  onClick={() => handleEdit(item)}
                >
                  <CreateIcon />
                </IconButton>
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
  handleEdit: PropTypes.func
};

export default LearnsTable;
