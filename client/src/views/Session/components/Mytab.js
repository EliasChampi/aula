import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Tabs,
  Tab,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  media: {
    height: "15em",
  },
  content: {
    marginTop: theme.spacing(3),
  },
}));

function Mytab({ title, subtitle, Priories, Activities }) {
  const classes = useStyles();
  const [tab, setTab] = React.useState("priori");

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <Card>
      <CardMedia
        className={classes.media}
        component="img"
        image="/images/mibg.svg"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="subtitle2">{subtitle}</Typography>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="on"
        >
          <Tab value="priori" label="Actividades pendientes" />
          <Tab value="activities" label="Actividades ya entregados" />
        </Tabs>
        <div className={classes.content}>
          {tab === "priori" && <Priories />}
          {tab === "activities" && <Activities />}
        </div>
      </CardContent>
    </Card>
  );
}

Mytab.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  Priories: PropTypes.any.isRequired,
  Activities: PropTypes.any.isRequired,
};

export default Mytab;
