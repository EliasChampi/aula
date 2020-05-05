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

import { yourdate } from "common/decorator.js";
import { Empty } from "components";
const Units = (props) => {
  const { units, handleEdit, handleActivity } = props;
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
            <TableCell>Actividades</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {units.map((item) => (
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
              <TableCell>{yourdate(item.created_at, "[del] YYYY")}</TableCell>
              <TableCell>
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  onClick={() => handleActivity(item)}
                >
                  Actividades
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!units.length && <Empty title="Sin Unidades" />}
    </TableContainer>
  );
};

Units.propTypes = {
  units: PropTypes.array.isRequired,
  handleEdit: PropTypes.func,
  handleActivity: PropTypes.func,
};

export default Units;
