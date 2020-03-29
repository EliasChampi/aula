import React, { useState, useEffect, useContext } from "react";
import { Card, CardHeader, Divider, CardContent } from "@material-ui/core";
import api from "../../service/learnunit";
import { ToastContext } from "context/toast";
import { LearnsTable } from "./components";

const LearnUnit = ({ match }) => {
  const [learns, setlearns] = useState([]);
  const { show } = useContext(ToastContext);

  useEffect(() => {
    let mounted = true;
    const fetchLearns = () => {
      api
        .fetchByOperative(match.params.op_code)
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

  return (
    <Card>
      <CardHeader subheader="Unidades de Aprendizaje" title="Unidades" />
      <Divider />
      <CardContent>
        <LearnsTable learns={learns} />
      </CardContent>
    </Card>
  );
};
export default LearnUnit;
