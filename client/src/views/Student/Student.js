import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core";
import StudentTable from "./components/StudentsTable";
import { AuthContext } from "context/auth";
import api from "../../service/register";
import { ToastContext } from "context/toast";
const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));
const Student = () => {
  const classes = useStyles();

  const { user } = useContext(AuthContext);
  const { show } = useContext(ToastContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api
      .fetchByFamily(user.dni)
      .then(r => {
        setStudents(r.values);
      })
      .catch(err => {
        show(err.message, "error");
      });
  }, []);
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <StudentTable students={students} />
      </div>
    </div>
  );
};
export default Student;
