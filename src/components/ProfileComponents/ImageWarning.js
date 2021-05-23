import React from "react";
import { Alert } from "react-bootstrap";
import "./profileStyle.css";
import { imageFailedMessage } from "../../constants";

export default function ImageWarning() {
  return (
    <Alert variant="danger" className="ImageWarning ml-2">
      {imageFailedMessage}
    </Alert>
  );
}
