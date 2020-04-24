import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import RegistersTable from "./RegistersTable";
import UpdateDialog from "./UpdateDialog";
import api from "service/register";

const TeacherCard = ({ show, section_code, code }) => {
  const [registers, setRegisters] = useState([]);

  useEffect(() => {
    let mounted = true;
    const fetchRegisters = () => {
      api
        .fetchBySectionWithResponse(section_code, code)
        .then((r) => {
          if (mounted) {
            setRegisters(r.values);
          }
        })
        .catch((error) => {
          show(error.message || error, "error");
        });
    };
    fetchRegisters();
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <React.Fragment>
      <RegistersTable registers={registers} />
      <UpdateDialog />
    </React.Fragment>
  );
};

TeacherCard.propTypes = {
  show: PropTypes.func,
  section_code: PropTypes.string,
  code: PropTypes.number,
};
export default TeacherCard;
