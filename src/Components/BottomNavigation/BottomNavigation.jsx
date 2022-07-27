import React, { useContext, useEffect, useState } from "react";
import "./BottomNavigation.css";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Badge from "@mui/material/Badge";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { UserContext } from "../../Context/User";
import LoginIcon from "@mui/icons-material/Login";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Notifications from "../Notifications/Notifications";
import { NavLink, useLocation } from "react-router-dom";
const BottomNavigation = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openNotification, setOpenNotification] = useState(false);
  const [render, setRender] = useState(false);
  const { pathname } = useLocation();
  const { user, setUser, render1, setRender1 } = useContext(UserContext);
  const [user1, setUser1] = useState({});

  const handleLogout = () => {
    setUser({});
    localStorage.removeItem("userInfo");
    setRender(!render);
    setRender1(!render1);
  };
  useEffect(() => {
    setUser1(JSON.parse(localStorage.getItem("userInfo")));
  }, [pathname, render]);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleNotifications = () => {
    setOpenNotification(!openNotification);
  };

  useEffect(() => {
    setOpenNotification(false);
  }, [pathname]);
  return (
    <>
      <div
        className="container-fluid main__div__nav"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          position: "fixed",
          top: "90vh",
          width: "100%",
          zIndex: "300",
        }}
      >
        <div
          className="main__bottom__nav"
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            width: "90%",
            margin: "0px auto",
            borderRadius: "20px",
            height: "60px",
            backgroundColor: "#F8CF4B",
            opacity: "1",
          }}
        >
          <NavLink
            to="/"
            className={(isActive) =>
              isActive ? "active__nav" : "inactive__nav"
            }
            style={{ color: "black" }}
          >
            <div className="col-md-1 ">
              <Tooltip title="Home">
                <HomeOutlinedIcon className="home__icon__main mt-1" />
              </Tooltip>
            </div>
          </NavLink>
          <NavLink
            to="/post"
            className={(isActive) => (isActive ? "" : "in")}
            style={{ color: "black" }}
          >
            <Tooltip title="Add a Post ">
              <Fab
                style={{ color: "gray", height: "16px", width: "35px" }}
                className=" home__icon__main mt-1"
                size="small"
                aria-label="add"
              >
                <AddIcon style={{ color: "black" }} className="add__post" />
              </Fab>
            </Tooltip>
          </NavLink>
          <div
            className={openNotification ? "active__noti" : "notactive__noti"}
          >
            <Tooltip title="Notifications">
              <Badge color="primary" badgeContent={3}>
                <NotificationsNoneOutlinedIcon
                  className="home__icon__main ml-1 mt-1"
                  onClick={handleNotifications}
                />
              </Badge>
            </Tooltip>
          </div>

          {user1 ? (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  boxShadow: "none",
                  border: "none",
                }}
              >
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    className="profile__button"
                  >
                    <Avatar
                      sx={{ width: 35, height: 35 }}
                      alt="Remy Sharp"
                      src={user ? user.pic : null}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <NavLink
                  to="/profile"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem>
                    <Avatar
                      sx={{ width: 32, height: 32 }}
                      alt="Remy Sharp"
                      src={user ? user.pic : null}
                    />{" "}
                    Profile
                  </MenuItem>
                </NavLink>

                <Divider />
                <NavLink
                  to="/settings"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                  </MenuItem>
                </NavLink>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Tooltip title="Login">
                <NavLink
                  to="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <LoginIcon className="home__icon__main ml-1 mt-1" />
                </NavLink>
              </Tooltip>
            </>
          )}
        </div>
      </div>
      {openNotification && (
        <Notifications
          openNotification={openNotification}
          setOpenNotification={setOpenNotification}
        />
      )}
    </>
  );
};

export default BottomNavigation;
