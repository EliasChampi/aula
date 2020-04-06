import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from "@material-ui/core";
import moment from "moment";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import DescriptionIcon from "@material-ui/icons/DescriptionRounded";
const TasksTable = props => {
  const { tasks } = props;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Codigo</TableCell>
          <TableCell>Titulo</TableCell>
          <TableCell>Fecha de Entrega</TableCell>
          <TableCell>Adjunto</TableCell>
          <TableCell>Calificaciones</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map(item => (
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
              <IconButton color="secondary">
                <DescriptionIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

TasksTable.propTypes = {
  tasks: PropTypes.array.isRequired
};
export default TasksTable;