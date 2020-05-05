import React, { useContext } from "react";
import { Grid } from "@material-ui/core";
import { Profile, Details } from "./components";
import { AuthContext } from "context/auth";

const Account = () => {
  const { user } = useContext(AuthContext);
  return (
    <Grid container spacing={4}>
      <Grid item lg={4} md={6} xl={4} xs={12}>
        <Profile user={user} />
      </Grid>
      <Grid item lg={8} md={6} xl={8} xs={12}>
        <Details user={user} />
      </Grid>
    </Grid>
  );
};

export default Account;
