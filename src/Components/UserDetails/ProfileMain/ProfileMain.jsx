import React from "react";
import "./ProfileMain.css";

const ProfileMain = ({ user }) => {
  return (
    <>
      <div className="flex card mb-4">
        <div className="card-body text-center">
          <img
            src={user ? user.pic : null}
            alt="avatar"
            className="m-auto h-20 w-20 rounded-circle img-fluid"
          />
          <h5 className="my-3">{user ? user.name : null}</h5>

          <p className="text-muted mb-4">{user ? user.location : null}</p>
        </div>
      </div>
    </>
  );
};

export default ProfileMain;
