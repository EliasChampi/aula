import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Button
} from "@material-ui/core";
import api from "service/learnunit";
import { ToastContext } from "context/toast";
import { LearnsTable } from "./components";
import Operative from "views/wrapper/Operative";
import { Link } from "react-router-dom";
import cache from "helpers/cache";

const LearnUnit = ({ match, history }) => {
  const [learns, setlearns] = useState([]);
  const { show } = useContext(ToastContext);
  const { section_code, op_code } = match.params;
  useEffect(() => {
    let mounted = true;
    const fetchLearns = () => {
      api
        .fetchByOperative(op_code)
        .then(r => {
          if (mounted) {
            setlearns(r.values);
          }
        })
        .catch(err => {
          show(err.message, "error");
        });
    };
    fetchLearns();
    return () => {
      mounted = false;
    };
  }, []);

  const RightButton = () => (
    <Button
      component={Link}
      variant="contained"
      color="primary"
      to={`/crear_unidad/${section_code}/${op_code}`}
    >
      Agregar
    </Button>
  );

  const handleEdit = item => {
    cache.setItem("learn_" + item.code, item);
    history.push(`/modificar_unidad/${section_code}/${op_code}/${item.code}`);
  };

  return (
    <Operative title="Unidades de Aprendizaje" RightButton={RightButton}>
      <Card>
        <CardHeader subheader="Unidades de Aprendizaje" title="Unidades" />
        <Divider />
        <CardContent>
          <LearnsTable learns={learns} handleEdit={handleEdit} />
        </CardContent>
      </Card>
    </Operative>
  );
};
export default LearnUnit;
