import React from "react"
import { makeStyles } from "@material-ui/core";
import StudentTable from "./components/StudentsTable"
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
    return (
        <div className={classes.root}>
           <div className={classes.content}>
                <StudentTable students={[]} />
            </div>
        </div>
    )
}
export default Student;