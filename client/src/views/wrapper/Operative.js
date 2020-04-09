import React, { useEffect, useState } from "react";
import { Grid, Typography, Button } from "@material-ui/core";
import PropTypes from "prop-types";
import cache from "helpers/cache";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  mb: {
    marginBottom: theme.spacing(2),
  },
  ml: {
    marginLeft: theme.spacing(1),
  },
}));

const Operative = (props) => {
  const [subtitle, setSubtitle] = useState("");
  const { title, RightButton, children, history, match } = props;
  const classes = useStyles();
  useEffect(() => {
    let mounted = true;
    const key = `op_${match.params.op_code}_sec_${match.params.section_code}`;
    if (cache.hasThis(key) && mounted) {
      const data = cache.getItem(key);
      const title = `${data.section_code.substr(-2)} de 
        ${data.section.degree.cycle.title}
        ${data.section.degree.cycle.branch.name}.
        ${data.course.name}`;
      setSubtitle(title);
    }
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <React.Fragment>
      <Grid
        className={classes.mb}
        alignItems="flex-end"
        container
        justify="space-between"
        spacing={3}
      >
        <Grid item>
          <Typography variant="overline" component="h2">
            {title}
          </Typography>
          <Typography variant="h4">{subtitle}</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={() => history.goBack()}>
            Atras
          </Button>
          <span className={classes.ml}>
            <RightButton />
          </span>
        </Grid>
      </Grid>
      {children}
    </React.Fragment>
  );
};
Operative.propTypes = {
  title: PropTypes.string.isRequired,
  RightButton: PropTypes.any.isRequired,
};
export default withRouter(Operative);
