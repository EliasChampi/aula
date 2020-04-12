import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Button,
} from "@material-ui/core";
import moment from "moment";
import DownloadIcon from "@material-ui/icons/CloudDownload";
const TasksTable = ({ tasks, handleCaliClick }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Codigo</TableCell>
          <TableCell>Titulo</TableCell>
          <TableCell>Fecha de Entrega</TableCell>
          <TableCell>Adjunto</TableCell>
          <TableCell>Acciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((item) => (
          <TableRow key={item.code}>
            <TableCell>{item.code}</TableCell>
            <TableCell>{item.title}</TableCell>
            <TableCell>{moment(item.to_date).format("DD [de] MMMM")}</TableCell>
            <TableCell>
              <IconButton>
                <DownloadIcon />
              </IconButton>
            </TableCell>
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
  );
};

TasksTable.propTypes = {
  tasks: PropTypes.array.isRequired,
  handleCaliClick: PropTypes.func,
};
export default TasksTable;
