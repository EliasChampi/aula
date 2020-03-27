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
    sectionApi.fetch(match.params.section_code).then(r => {
      if (r.values !== null) {
        const title = `${r.values.code.substr(-2)} de 
        ${r.values.degree.cycle.title}. ${r.values.degree.cycle.branch.name}`;
        setSubtitle(title);
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
