import React from "react";
import PropTypes from "prop-types";
import "./styles"
// Custom button component, either '<' or '>'
const NextButton = ({ direction, onClick, hidden, htmlClass }) => {
  return (
    hidden ? <div></div> :
    <i
    className={
      `fa fa-chevron-${direction} fa-lg hover ${htmlClass}`
    }
    onClick={onClick}
  ></i>
  );
};

NextButton.propTypes = {
  direction: PropTypes.oneOf(["left", "right"]),
  onClick: PropTypes.func.isRequired,
  hidden: PropTypes.bool.isRequired,
  htmlClass: PropTypes.string,
};

export default NextButton;
