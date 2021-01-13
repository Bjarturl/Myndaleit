import React from "react";
import PropTypes from "prop-types";

// Functional component for all page content
const Container = ({ children }) => {
  return <div className="container">{children}</div>;
};

Container.propTypes = {
  children: PropTypes.object,
};

export default Container;
