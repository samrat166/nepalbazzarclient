import React from "react";
import { Alert, Snackbar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

const SuccessMessage = ({ open, handleClose, message, showStar = false }) => {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
        {message}
        {showStar && <StarIcon style={{ color: "#FDCC0D" }} />}
      </Alert>
    </Snackbar>
  );
};

export default SuccessMessage;
