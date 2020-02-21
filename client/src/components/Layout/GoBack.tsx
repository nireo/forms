import React from "react";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

type Props = {
  goMain?: boolean;
};

export const GoBack: React.FC<Props> = ({ goMain }) => {
  return (
    <div>
      <Link to={`/${goMain === undefined ? "" : "main"}`}>
        <IconButton component="span" aria-label="go-back">
          <ArrowBackIcon />
        </IconButton>
      </Link>
    </div>
  );
};
