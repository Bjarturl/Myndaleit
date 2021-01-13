import React, { useState } from "react";
import PropTypes from "prop-types";
import Card from "react-bootstrap/Card";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import "./styles";

// Component for displaying content+image on a card
const CustomCard = ({ title, href, img }) => {
  const [photo, setPhoto] = useState(img); // Card photo, defaults as prop
  const onError = () => setPhoto("../../../public/placeholder.jpg"); // Return placeholder if photo is invalid
  return (
    <div className="card-container">
      <Card className="bordered-3 themed-bg">
        {/* Image is displayed on top */}
        <Card.Img
          className="bordered-3"
          variant="top"
          src={photo}
          onError={() => onError()}
        />
        <Card.Body>
          {/* Full title is displayed on hover with overlay */}
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={(props) => (
              <Tooltip {...props}>
                <b>{title}</b>
              </Tooltip>
            )}
          >
            {/* Partial title displayed to avoid varying card sizes */}
            <Card.Title>
              <a href={href}>{title}</a>
            </Card.Title>
          </OverlayTrigger>
        </Card.Body>
      </Card>
    </div>
  );
};

CustomCard.propTypes = {
  title: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default CustomCard;
