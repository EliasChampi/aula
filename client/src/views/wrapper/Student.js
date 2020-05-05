import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import api from "service/student";
import { Header } from "components";
import cache from "helpers/cache";

const Student = ({ title, register_code, children, RightButton }) => {
  const [student, setStudent] = useState({});
  useEffect(() => {
    let mounted = true;
    const fetchStudent = () => {
      if (cache.hasThis(register_code) && mounted) {
        setStudent(cache.getItem(register_code));
      } else {
        api.fetchByCode(register_code).then((r) => {
          if (mounted) {
            setStudent(r.value);
          }
        });
      }
    };
    fetchStudent();
    return () => {
      mounted = false;
      cache.removeItem(register_code);
    };
  }, [register_code]);

  return (
    <React.Fragment>
      <Header
        title={title}
        subtitle={student.fullname}
        RightButton={RightButton}
      />
      {children}
    </React.Fragment>
  );
};

Student.propTypes = {
  title: PropTypes.string.isRequired,
  register_code: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  RightButton: PropTypes.any.isRequired,
};

export default Student;
