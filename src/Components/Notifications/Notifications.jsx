import React, { useEffect, useState, useContext } from "react";
import "./Notifications.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import NotificationItem from "./NotificationItem/NotificationItem";
import axios from "axios";
import { Skeleton } from "@mui/material";
import { UserContext } from "../../Context/User";
import NoAuth from "../NoAuth/NoAuth";

const Notifications = ({ setOpenNotification, openNotification }) => {
  const { user, error } = useContext(UserContext);
  const [salesNotifications, setSalesNoifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSalesNotifications, setShowSalesNotifications] = useState(true);
  const [b, setB] = useState(false);
  const [buysNotifications, setBuysNotifications] = useState([]);
  const [boughtItemNotificationData, setBoughtItemNotificationData] = useState(
    []
  );
  const [boughtItemNotification, setBoughtItemNotification] = useState(false);

  const [showBoughtItem] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/sold/user/${user ? user._id : null}`
      );
      setSalesNoifications(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const { data } = await axios.get(
        `http://localhost:4000/api/v1/buy/user/${user ? user._id : null}`
      );
      console.log(data);
      setBuysNotifications(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/item/single/buyer/${
            user ? user._id : null
          }`
        );
        if (data) {
          console.log(data);
          setBoughtItemNotificationData(data.msg);
        }
      } catch (error) {
        console.log(error.response.data.msg);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Dialog
        open={openNotification}
        onClose={() => setOpenNotification(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ width: "100%" }}
      >
        <DialogTitle id="alert-dialog-title" style={{ textAlign: "center" }}>
          Your Notifications
        </DialogTitle>
        <div className="container d-flex justify-evenly my-3">
          <div
            className={showSalesNotifications ? "container" : "container"}
            onClick={() => {
              setShowSalesNotifications(true);
              setB(false);
            }}
          >
            <h1
              className={
                showSalesNotifications
                  ? "text-black-900 border-2 text-center text-2xl cursor-pointer active__value"
                  : "text-black-900 border-2 text-center text-2xl cursor-pointer "
              }
            >
              Sales
            </h1>
          </div>
          <div
            className={b ? "container" : "container"}
            onClick={() => {
              setShowSalesNotifications(false);
              setB(true);
            }}
          >
            <h1
              className={
                b
                  ? "text-black-900 border-2 text-center text-2xl cursor-pointer  active__value"
                  : "text-black-900 border-2 text-center text-2xl cursor-pointer "
              }
            >
              Buys
            </h1>
          </div>
        </div>
        {showSalesNotifications && (
          <>
            {salesNotifications
              ? salesNotifications.length === 0 && (
                  <h1 style={{ padding: "20px" }}>
                    No New Sells Notification For You {user ? user.name : null}
                  </h1>
                )
              : null}
          </>
        )}
        {b && (
          <>
            {buysNotifications
              ? buysNotifications.length === 0 && (
                  <h1 style={{ padding: "20px" }}>
                    No New Buys Notification For You {user ? user.name : null}
                  </h1>
                )
              : null}
          </>
        )}

        {error === "" ? (
          <>
            {loading ? (
              <>
                {loading && (
                  <Skeleton style={{ height: "100px", width: "500px" }} />
                )}

                {loading && (
                  <Skeleton
                    style={{
                      height: "100px",
                      width: "500px",
                      marginTop: "-36px",
                    }}
                  />
                )}

                {loading && (
                  <Skeleton
                    style={{
                      height: "100px",
                      width: "500px",
                      marginTop: "-36px",
                    }}
                  />
                )}
                {loading && (
                  <Skeleton
                    style={{
                      height: "100px",
                      width: "500px",
                      marginTop: "-36px",
                    }}
                  />
                )}
              </>
            ) : (
              <>
                {showSalesNotifications && (
                  <>
                    {salesNotifications
                      ? salesNotifications.slice(0, 6).map((value) => {
                          return (
                            <>
                              <NotificationItem
                                value={value}
                                loading={loading}
                                showSalesNotifications={showSalesNotifications}
                              />
                            </>
                          );
                        })
                      : null}
                  </>
                )}
                {showBoughtItem && (
                  <>
                    {boughtItemNotificationData
                      ? boughtItemNotificationData.map((boughtItem) => {
                          return (
                            <NotificationItem
                              value={boughtItem}
                              loading={loading}
                              b={b}
                              boughtItemNotificationData={
                                boughtItemNotificationData
                              }
                              showBoughtItem={showBoughtItem}
                            />
                          );
                        })
                      : null}
                  </>
                )}
                {b && (
                  <>
                    {buysNotifications
                      ? buysNotifications.slice(0, 6).map((value) => {
                          return (
                            <>
                              <NotificationItem
                                value={value}
                                loading={loading}
                                b={b}
                              />
                            </>
                          );
                        })
                      : null}
                  </>
                )}
              </>
            )}

            <DialogActions>
              <Button
                onClick={() => setOpenNotification(false)}
                className="notification__button__main"
              >
                Close
              </Button>
            </DialogActions>
          </>
        ) : (
          <>
            <NoAuth />
            <DialogActions>
              <Button
                onClick={() => setOpenNotification(false)}
                className="notification__button__main"
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default Notifications;
