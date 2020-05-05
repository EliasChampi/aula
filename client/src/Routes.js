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
        path="/estudiantes/:section_code/:op_code"
      />
      <ProtectedRoute
        component={view.Pending}
        exact
        isAuthed={isAuthed}
        path="/estudiante/:section_code/:register_code"
      />
      <ProtectedRoute
        component={view.Unit}
        exact
        isAuthed={isAuthed}
        path="/unidades/:section_code/:op_code"
      />
      <ProtectedRoute
        component={view.CreateUnit}
        exact
        isAuthed={isAuthed}
        path="/crear_unidad"
      />
      <ProtectedRoute
        component={view.ByUnit}
        exact
        isAuthed={isAuthed}
        path="/actividades/:section_code/:op_code/:code"
      />
      <ProtectedRoute
        component={view.Revised}
        exact
        isAuthed={isAuthed}
        path="/revisados/:section_code/:register_code"
      />
      <ProtectedRoute
        component={view.Calification}
        exact
        isAuthed={isAuthed}
        path="/calificaciones/:section_code/:code"
      />
      <ProtectedRoute
        component={view.Activity}
        exact
        isAuthed={isAuthed}
        path="/actividad/:section_code/:register_code/:code"
      />
      <ProtectedRoute
        component={view.CreateUnit}
        exact
        isAuthed={isAuthed}
        path="/modificar_unidad/:code"
      />
      <ProtectedRoute
        component={view.Account}
        exact
        isAuthed={isAuthed}
        path="/mis-datos"
      />
      <ProtectedRoute
        component={view.About}
        exact
        isAuthed={isAuthed}
        path="/acerca-de"
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
