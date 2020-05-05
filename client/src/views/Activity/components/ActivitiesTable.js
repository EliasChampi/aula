import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  IconButton,
} from "@material-ui/core";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import { yourdate } from "common/decorator.js";
import { Empty } from "components";
const ActivitiesTable = ({ activities, handleCaliClick }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Codigo</TableCell>
            <TableCell>Titulo</TableCell>
            <TableCell>Fecha de Entrega</TableCell>
            <TableCell>Calificaciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {activities.map((item) => (
            <TableRow hover key={item.code}>
              <TableCell>{item.code}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{yourdate(item.to_date)}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleCaliClick(item.code)}
                  color="secondary"
                  size="small"
                >
                  <PlaylistAddCheckIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!activities.length && <Empty title="Sin Actividades" />}
    </TableContainer>
  );
};

ActivitiesTable.propTypes = {
  activities: PropTypes.array.isRequired,
  handleCaliClick: PropTypes.func,
};
export default ActivitiesTable;
