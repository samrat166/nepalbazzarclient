import React from "react";
import { Alert, Snackbar } from "@mui/material";

const ErrorMessage = ({ open, handleClose, message }) => {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default ErrorMessage;
