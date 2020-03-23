import React,{useContext} from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { AuthContext } from "./context/auth"
import { ProtectedRoute,PublicRoute } from './components';

import {
  Dashboard as DashboardView,
  Student as StudentView,
  Account as AccountView,
  Settings as SettingsView,
  SignIn as SignInView,
  NotFound as NotFoundView
} from './views';

const Routes = () => {
  const { isAuthed } = useContext(AuthContext);
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/dashboard"
      />
      <ProtectedRoute
        component={DashboardView}
        exact
        isAuthed={isAuthed}
        path="/dashboard"
      />
      <ProtectedRoute
        component={StudentView}
        exact
        isAuthed={isAuthed}
        path="/users"
      />
      <ProtectedRoute
        component={AccountView}
        exact
        isAuthed={isAuthed}
        path="/account"
      />
      <ProtectedRoute
        component={SettingsView}
        exact
        isAuthed={isAuthed}
        path="/settings"
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
