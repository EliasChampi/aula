import React, { useState, useEffect, useContext } from "react";
import { BySectionTable } from "./components";
import api from "service/register";
import { ToastContext } from "context/toast";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
} from "@material-ui/core";
import Operative from "views/Wrapper/Operative";

const BySection = ({ match }) => {
  const { show } = useContext(ToastContext);
  const [registers, setRegisters] = useState([]);
  const { section_code } = match.params;
  useEffect(() => {
    let mounted = true;
    const fetchData = () => {
      api
        .fetchBySection(section_code)
        .then((r) => {
          if (mounted) {
            setRegisters(r.values);
          }
        })
        .catch((err) => {
          show(err.message);
        });
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  const RightButton = () => (
    <Button color="secondary" variant="contained">
      Imprimir
    </Button>
  );

  return (
    <Operative title="Estudiantes" RightButton={RightButton}>
      <Card>
        <CardHeader subheader="Listado de Estudiantes" title="Estudiantes" />
        <Divider />
        <CardContent>
          <BySectionTable data={registers} />
        </CardContent>
      </Card>
    </Operative>
  );
};

export default BySection;
