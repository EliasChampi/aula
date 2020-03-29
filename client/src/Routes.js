import React, { useContext } from "react";
import { Switch, Redirect } from "react-router-dom";
import { AuthContext } from "./context/auth";
import { ProtectedRoute, PublicRoute } from "./components";

import view from "./views";

const Routes = () => {
  const { isAuthed, user } = useContext(AuthContext);
  const DashView = user.mode === "docente" ? view.Course : view.Student;
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
        component={view.BySection}
        exact
        isAuthed={isAuthed}
        path="/estudiantes-por-seccion/:section_code"
      />
      <ProtectedRoute
        component={view.LearnUnit}
        exact
        isAuthed={isAuthed}
        path="/unidades/:op_code"
      />
      <ProtectedRoute
        component={view.Account}
        exact
        isAuthed={isAuthed}
        path="/mis-datos"
      />
      <ProtectedRoute
        component={view.Settings}
        exact
        isAuthed={isAuthed}
        path="/configuracion"
      />
      <PublicRoute
        component={view.SignIn}
        exact
        isAuthed={isAuthed}
        path="/login"
      />
      <ProtectedRoute
        component={view.NotFound}
        exact
        isAuthed={isAuthed}
        path="/desconocido"
      />
      <Redirect to="/desconocido" />
    </Switch>
  );
};

export default Routes;
