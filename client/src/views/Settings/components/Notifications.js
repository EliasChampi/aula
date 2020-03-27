import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Divider,
  FormControlLabel,
  Checkbox,
  Typography,
  Button
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column"
  }
}));

const Notifications = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <form>
        <CardHeader
          subheader="Administración de Notificaciones"
          title="Notificationes"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={6} wrap="wrap">
            <Grid className={classes.item} item md={4} sm={6} xs={12}>
              <Typography gutterBottom variant="h6">
                Notificationes
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Email"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Notificationes push"
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Mensajes Sms"
              />
            </Grid>
            <Grid className={classes.item} item md={4} sm={6} xs={12}>
              <Typography gutterBottom variant="h6">
                Mensajes
              </Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Email"
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Notificationes push"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    defaultChecked //
                  />
                }
                label="Mensajes Sms"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions>
          <Button color="primary" variant="contained">
            Guardar
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
