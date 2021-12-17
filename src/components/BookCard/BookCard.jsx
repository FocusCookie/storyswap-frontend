import React from "react";
import PropTypes from "prop-types";
import "./BookCard.css";
import { Card } from "../Card/Card";
import { Badge } from "../Badge/Badge";

export const BookCard = ({
  onClick,
  alt,
  imageUrl,
  variant,
  label,
  ...props
}) => {
  return (
    <Card>
      <div className="book-card" onClick={onClick} {...props}>
        <div
          className="book-card__cover"
          role="img"
          aria-label={alt}
          style={{ backgroundImage: `url(${imageUrl})` }}
        >
          {!imageUrl ? alt : null}
        </div>
        <Badge fullwidth variant={variant}>
          {label}
        </Badge>
      </div>
    </Card>
  );
};

BookCard.propTypes = {
  /**
   * click handler
   */
  onClick: PropTypes.func,
  /**
   * altTexternative text for the imageUrl
   */
  alt: PropTypes.string,
  /**
   * book cover imageUrl to show
   */
  imageUrl: PropTypes.string,
  /**
   * style of the badge
   */
  variant: PropTypes.oneOf(["accent", "medium", "primary"]),
  /**
   * text which is displayed in the badge
   */
  label: PropTypes.string,
};

BookCard.defaultProps = {
  onClick: undefined,
  variant: "medium",
};
