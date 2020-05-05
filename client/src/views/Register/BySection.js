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
import cache from "helpers/cache";

const BySection = ({ match, history }) => {
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
  }, [section_code]);

  const handleGo = (reg) => {
    cache.setItem(reg.code, reg.student);
    history.push(`/estudiante/${section_code}/${reg.code}`);
  };

  return (
    <Operative
      title="Estudiantes"
      RightButton={
        <Button color="secondary" variant="contained">
          Imprimir
        </Button>
      }
    >
      <Card>
        <CardHeader subheader="Listado de Estudiantes" title="Estudiantes" />
        <Divider />
        <CardContent>
          <BySectionTable data={registers} handleGo={handleGo} />
        </CardContent>
      </Card>
    </Operative>
  );
};

export default BySection;
