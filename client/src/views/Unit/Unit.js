import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Button,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import api from "service/unit";
import { ToastContext } from "context/toast";
import { UnitsTable } from "./components";
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
  }, []);

  const RightButton = () => (
    <Button
      component={Link}
      variant="contained"
      color="secondary"
      to={`/crear_unidad`}
    >
      Agregar
    </Button>
  );

  const handleEdit = (item) => {
    cache.setItem("unit_" + item.code, item);
    history.push(`/modificar_unidad/${item.code}`);
  };

  const handleActivity = (item) => {
    history.push(`/actividades/${section_code}/${op_code}/${item.code}`);
  };

  return (
    <Operative title="Unidades de Aprendizaje" RightButton={RightButton}>
      <Card>
        <CardHeader subheader="Unidades de Aprendizaje" title="Unidades" />
        <Divider />
        <CardContent>
          <UnitsTable
            units={units}
            handleEdit={handleEdit}
            handleActivity={handleActivity}
          />
        </CardContent>
      </Card>
    </Operative>
  );
};
export default Unit;
