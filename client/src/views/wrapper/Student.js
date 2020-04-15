import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import api from "service/student";
import { Header } from "components";

const Student = ({ title, dni, children, show, RightButton }) => {
  const [student, setStudent] = useState({});
  useEffect(() => {
    let mounted = true;
    const fetchStudent = () => {
      api
        .fetchByCode(dni)
        .then((r) => {
          if (mounted) {
            setStudent(r.value);
          }
        })
        .catch((error) => {
          show(error.message || error, "error");
        });
    };
    fetchStudent();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <React.Fragment>
      <Header
        title={title}
        subtitle={`${student.name} ${student.surname} ${student.second_surname}`}
        RightButton={RightButton}
      />
      {children}
    </React.Fragment>
  );
};

Student.propTypes = {
  title: PropTypes.string.isRequired,
  dni: PropTypes.string.isRequired,
  show: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
  RightButton: PropTypes.any.isRequired,
};

export default Student;
