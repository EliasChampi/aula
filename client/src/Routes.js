import React, { useContext } from "react";
import { Switch, Redirect } from "react-router-dom";
import { AuthContext } from "./context/auth";
import { ProtectedRoute, PublicRoute } from "./components";

import {
  Course as CourseView,
  Account as AccountView,
  Settings as SettingsView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Student as StudentView
} from "./views";

const Routes = () => {
  const { isAuthed, user } = useContext(AuthContext);
  const DashView = user.mode === "docente" ? CourseView : StudentView;
  return (
    <Switch>
      <Redirect exact from="/" to="/dashboard" />
      <ProtectedRoute
        component={DashView}
        exact
        isAuthed={isAuthed}
        path="/dashboard"
      />
      <ProtectedRoute
        component={AccountView}
        exact
        isAuthed={isAuthed}
        path="/mis-datos"
      />
      <ProtectedRoute
        component={SettingsView}
        exact
        isAuthed={isAuthed}
        path="/configuracion"
      />
      <PublicRoute
        component={SignInView}
        exact
        isAuthed={isAuthed}
        path="/login"
      />
      <ProtectedRoute
        component={NotFoundView}
        exact
        isAuthed={isAuthed}
        path="/desconocido"
      />
      <Redirect to="/desconocido" />
    </Switch>
  );
};

export default Routes;
