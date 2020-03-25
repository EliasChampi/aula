import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";

import { UsersToolbar, CoursesTable } from "./components";
import mockData from "./data";

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

  const [courses] = useState(mockData);

  return (
    <div className={classes.root}>
      <UsersToolbar />
      <div className={classes.content}>
        <CoursesTable courses={courses} />
      </div>
    </div>
  );
};

export default Student;
