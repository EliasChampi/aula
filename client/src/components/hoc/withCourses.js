import React, { Component } from "react";
import api from "service/course";
import { ToastContext } from "context/consumer";
import cache from "helpers/cache";
export default function withCourses(WrapedComponent) {
  return class extends Component {
    state = {
      courses: []
    };
    static contextType = ToastContext;
    componentDidMount() {
      const user = cache.getItem("user");
      api
        .fetchByTeacher(user.dni)
        .then(r => {
          this.setState({ courses: r.values });
        })
        .catch(error => {
          this.context.show(error.message || error, "error");
        });
    }
    render() {
      return (
        <WrapedComponent
          show={this.context.show}
          courses={this.state.courses}
          {...this.props}
        />
      );
    }
  };
}
