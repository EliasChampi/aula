import React from "react";
import { Grid } from "@material-ui/core";
import { Profile, Details, Password } from "./components";

const Account = () => {
  return (
    <Grid container spacing={4}>
      <Grid item lg={4} md={6} xl={4} xs={12}>
        <Profile />
        <Password style={{ marginTop: "8px" }} />
      </Grid>
      <Grid item lg={8} md={6} xl={8} xs={12}>
        <Details />
      </Grid>
    </Grid>
  );
};

export default Account;
