import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Paper,
  Button,
} from "@material-ui/core";
import { yourdate, activityType } from "common/decorator";
import api from "service/activity";
import { withRouter } from "react-router-dom";
import { Empty } from "components";

const RevisedTable = ({ match, history, show }) => {
  const [reviseds, setReviseds] = useState([]);
  const { register_code, section_code } = match.params;
  useEffect(() => {
    let mounted = true;
    const fetchData = () => {
      api
        .fetchByRegWithRes(register_code, section_code)
        .then((r) => {
          if (mounted) {
            setReviseds(r.values);
          }
        })
        .catch((error) => {
          show(error.message || error, "error");
        });
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, [register_code, section_code]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Curso</TableCell>
            <TableCell>Código</TableCell>
            <TableCell>Actividad</TableCell>
            <TableCell>Fecha de Entrega</TableCell>
            <TableCell>Calificación</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reviseds.map((item) => (
            <TableRow hover key={item.code}>
              <TableCell>
                <b>{item.unit.Operatives[0].course.name}</b>
              </TableCell>
              <TableCell>{`${activityType[item.type]} N° ${
                item.code
              }`}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{yourdate(item.to_date)}</TableCell>
              <TableCell>
                {item.responses.length
                  ? item.responses[0].score
                  : "No revisado"}
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() =>
                    history.push(
                      `/actividad/${section_code}/${register_code}/${item.code}`
                    )
                  }
                >
                  Ver Detalle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!reviseds.length && <Empty title="Sin actividades" />}
    </TableContainer>
  );
};

RevisedTable.propTypes = {
  show: PropTypes.func.isRequired,
};

export default withRouter(RevisedTable);
