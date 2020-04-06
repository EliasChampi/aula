import React from "react";
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  mb: {
    marginBottom: theme.spacing(2)
  }
}));
const Header = ({ title, subtitle, RightButton }) => {
  const classes = useStyles();
  return (
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
        <RightButton />
      </Grid>
    </Grid>
  );
};
export default Header;
