import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export const GoBack: React.FC = () => {
  return (
    <div>
      <Link to="/">
        <IconButton component="span" aria-label="go-back">
          <ArrowBackIcon />
        </IconButton>
      </Link>
    </div>
  );
};
