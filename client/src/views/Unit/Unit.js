import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { UnitsTable } from "./components";
import { ToastContext } from "context/toast";
import api from "service/unit";
import Operative from "views/Wrapper/Operative";
import cache from "helpers/cache";

const Unit = ({ match, history }) => {
  const [units, setUnits] = useState([]);
  const { show } = useContext(ToastContext);
  const { section_code, op_code } = match.params;
  useEffect(() => {
    let mounted = true;
    const fetchUnits = () => {
      api
        .fetchByOperative(op_code)
        .then((r) => {
          if (mounted) {
            setUnits(r.values);
          }
        })
        .catch((err) => {
          show(err.message, "error");
        });
    };
    fetchUnits();
    return () => {
      mounted = false;
    };
  }, [op_code]);

  const handleEdit = (item) => {
    cache.setItem("unit_" + item.code, item);
    history.push(`/modificar_unidad/${item.code}`);
  };

  return (
    <Operative
      title="Unidades de Aprendizaje"
      RightButton={
        <Button
          component={Link}
          variant="contained"
          color="secondary"
          to={`/crear_unidad`}
        >
          Agregar
        </Button>
      }
    >
      <Card>
        <CardHeader subheader="Unidades de Aprendizaje" title="Unidades" />
        <Divider />
        <CardContent>
          <UnitsTable
            units={units}
            handleEdit={handleEdit}
            handleActivity={(item) => {
              history.push(
                `/actividades/${section_code}/${op_code}/${item.code}`
              );
            }}
          />
        </CardContent>
      </Card>
    </Operative>
  );
};
export default Unit;
