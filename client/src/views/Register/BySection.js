import React, { useState, useEffect, useContext } from "react";
import { BySectionTable } from "./components";
import api from "../../service/register";
import sectionApi from "../../service/section";
import { ToastContext } from "context/toast";
import { Card, CardContent, CardHeader, Divider } from "@material-ui/core";

const BySection = ({ match }) => {
  const { show } = useContext(ToastContext);
  const [registers, setRegisters] = useState([]);
  const [subtitle, setSubtitle] = useState("");
  useEffect(() => {
    let mounted = true;
    const fetchData = () => {
      sectionApi.fetch(match.params.section_code).then(res => {
        if (res !== false && mounted) {
          setSubtitle(res);
          api
            .fetchBySection(match.params.section_code)
            .then(r => {
              setRegisters(r.values);
            })
            .catch(err => {
              show(err.message, "error");
            });
        }
      });
    };
    fetchData();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Card>
      <CardHeader subheader={subtitle} title="Listado de Estudiantes" />
      <Divider />
      <CardContent>
        <BySectionTable data={registers} />
      </CardContent>
    </Card>
  );
};

export default BySection;
