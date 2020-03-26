import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/styles";
import { UsersToolbar, CoursesTable } from "./components";
import api from "../../service/course";
import { AuthContext } from "context/auth";
import { ToastContext } from "context/toast";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const Course = () => {
  const classes = useStyles();
  const { user } = useContext(AuthContext);
  const { show } = useContext(ToastContext);
  const [courses, setCourses] = useState([]);
  
  useEffect(() => {
    api.fetchByTeacher(user.dni).then(r => {
      setCourses(r.values)
    }).catch(err => {
      show(err.message, "error");
    });
    return () => {
      setCourses([]);
    }; 
  }, []);


  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <CoursesTable courses={courses} />
      </div>
    </div>
  );
};

export default Course;
