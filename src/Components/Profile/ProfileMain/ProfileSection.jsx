import React, { useContext, useState } from "react";
import "../Profile.css";
import { UserContext } from "../../../Context/User";
import "./Profile.css";
import { Alert, Backdrop, Snackbar, Tooltip } from "@mui/material";
import Update from "../Update/Update";
import EditIcon from "@mui/icons-material/Edit";
import UpdateName from "../Update/UpdateName";
import UpdateAddress from "../Update/UpdateAddress";

const ProfileSection = () => {
  const { user, error } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [success1, setSuccess1] = useState(false);
  const [success2, setSuccess2] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  const handleClose = () => {
    setSuccess(false);
    setSuccess1(false);
    setSuccess2(false);
  };

  const handleEdit = () => {
    setOpen1(true);
  };
  const handleEdit1 = () => {
    setOpen2(true);
  };
  return (
    <>
      {open && (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <Update setOpen={setOpen} setSuccess={setSuccess} />
          </Backdrop>
        </>
      )}
      {open1 && (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open1}
          >
            <UpdateName setOpen={setOpen1} setSuccess={setSuccess1} />
          </Backdrop>
        </>
      )}
      {open2 && (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open2}
          >
            <UpdateAddress setOpen={setOpen2} setSuccess={setSuccess2} />
          </Backdrop>
        </>
      )}
      {success && (
        <Snackbar open={success} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully Updated Your Profile Picture.
          </Alert>
        </Snackbar>
      )}
      {success1 && (
        <Snackbar open={success1} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully Updated Your Name.
          </Alert>
        </Snackbar>
      )}
      {success2 && (
        <Snackbar open={success2} autoHideDuration={2000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Successfully Updated Your Address.
          </Alert>
        </Snackbar>
      )}
      <div className="flex card mb-4">
        <div className="card-body text-center">
          <h5 className="my-3">
            {user ? user.name : null}{" "}
            <Tooltip title="Edit My Name">
              <EditIcon style={{ cursor: "pointer" }} onClick={handleEdit} />
            </Tooltip>
          </h5>

          <p className="text-muted mb-4 mt-1">
            Update Image By Clicking On Image.
          </p>
          <div
            className="w-20 h-20 rounded-full inline-flex items-center justify-center bg-gray-200 text-gray-400 profile-pic"
            style={{
              backgroundImage: `url(${user ? user.pic : null})`,
            }}
            onClick={() => setOpen(true)}
          >
            <span class="glyphicon glyphicon-camera"></span>
            <span>Change Image</span>
          </div>

          <p className="text-muted mb-4 mt-2">
            {user ? user.location : null}{" "}
            <Tooltip title="Edit My Address">
              <EditIcon
                style={{ cursor: "pointer", color: "black" }}
                onClick={handleEdit1}
              />
            </Tooltip>
          </p>
        </div>
      </div>
    </>
  );
};

export default ProfileSection;
