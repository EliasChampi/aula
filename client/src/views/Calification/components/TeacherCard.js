import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import {
  TextField,
  Select,
  MenuItem,
  Slider,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import RegistersTable from "./RegistersTable";
import api from "service/register";
import resApi from "service/response";
import { downloadFile } from "common/utils";
import { Modal } from "components";

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.divider,
    padding: theme.spacing(2),
  },
}));

const TeacherCard = ({ show, section_code, code }) => {
  const [registers, setRegisters] = useState([]);
  const [selected, setSelected] = useState({});
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("num");
  const [score, setScore] = useState(15);
  const [obs, setObs] = useState("");
  const classes = useStyles();

  const marks = [
    {
      value: 0,
      label: "C",
    },
    {
      value: 10,
      label: "B",
    },
    {
      value: 15,
      label: "A",
    },
    {
      value: 20,
      label: "AD",
    },
  ];

  const fetchRegisters = useCallback(
    (mounted) => {
      api
        .fetchBySectionWithResponse(section_code, code)
        .then((r) => {
          if (mounted) {
            setRegisters(r.values);
          }
        })
        .catch((error) => {
          show(error.message || error, "error");
        });
    },
    [section_code, code, show]
  );

  useEffect(() => {
    let mounted = true;
    fetchRegisters(mounted);
    return () => {
      mounted = false;
    };
  }, [fetchRegisters]);

  const handleDownload = (register_code, attached) => {
    resApi
      .downloadAttached(register_code, code)
      .then((r) => {
        downloadFile(r, attached);
      })
      .catch((error) => {
        show(error, "error");
      });
  };

  const handleType = (event) => {
    let myscore = 15;
    if (type === "sin") {
      myscore = null;
    }
    setScore(myscore);
    setType(event.target.value);
  };

  const handleScore = (event, newValue) => {
    setScore(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleRevItem = (register) => {
    let myscore = null;
    const mystudent = {
      code: register.code,
      name: register.student.fullname,
    };
    if (register.responses.length > 0) {
      setObs(register.responses[0].obs);
    }
    setType("sin");
    setScore(myscore);
    setSelected(mystudent);
    setOpen(true);
  };

  const handleRevSubmit = () => {
    let newScore = score;
    if (type === "alf") {
      newScore = marks.find((item) => {
        return item.value === score;
      }).label;
    }
    resApi
      .update(selected.code, code, {
        score: newScore,
        obs,
      })
      .then((r) => {
        show(r.message, "success");

        setScore(null);
        setObs(null);

        fetchRegisters(true);
        handleClose();
      })
      .catch((error) => {
        show(error.message || error, "error");
      });
  };

  return (
    <React.Fragment>
      <RegistersTable
        registers={registers}
        handleDownload={handleDownload}
        handleRev={handleRevItem}
      />
      <Modal
        open={open}
        close={handleClose}
        title={`Calificación de ${selected.name}`}
        fullWidth
        handleConfirm={handleRevSubmit}
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          onChange={handleType}
          fullWidth
        >
          <MenuItem value="num">Vigesimal</MenuItem>
          <MenuItem value="alf">Alfabetica</MenuItem>
          <MenuItem value="sin">Sin Calificación</MenuItem>
        </Select>
        {type !== "sin" && (
          <div className={classes.margin}>
            <Typography id="continuous-slider" gutterBottom>
              Calificación
            </Typography>
            <Slider
              value={score}
              onChange={handleScore}
              min={0}
              max={20}
              step={type === "num" ? 0.5 : null}
              marks={type === "alf" ? marks : false}
              valueLabelDisplay={type === "num" ? "on" : "off"}
              aria-labelledby="continuous-slider"
            />
          </div>
        )}
        <TextField
          id="obs"
          fullWidth
          multiline
          label="Observaciones"
          rowsMax={4}
          rows={3}
          value={obs}
          onChange={(e) => setObs(e.target.value)}
        />
      </Modal>
    </React.Fragment>
  );
};

TeacherCard.propTypes = {
  show: PropTypes.func,
  section_code: PropTypes.string,
  code: PropTypes.string,
};
export default TeacherCard;
