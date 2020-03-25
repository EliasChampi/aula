import React, { Component } from "react";
import { Router as BrowseRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import { ThemeProvider } from "@material-ui/styles";
import validate from "validate.js";
import theme from "./theme";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./assets/scss/index.scss";
import validators from "./common/validators";
import Routes from "./Routes";
import { AuthProvider, ToastProvider } from "./context/provider";
const browserHistory = createBrowserHistory();

validate.validators = {
  ...validate.validators,
  ...validators
};

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ToastProvider>
          <AuthProvider>
            <BrowseRouter history={browserHistory}>
              <Routes />
            </BrowseRouter>
          </AuthProvider>
        </ToastProvider>
      </ThemeProvider>
    );
  }
}

export default App;
