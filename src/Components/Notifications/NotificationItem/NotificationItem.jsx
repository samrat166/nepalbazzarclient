import { Tooltip } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../Context/User";

const NotificationItem = ({
  value,
  showSalesNotifications,
  b,
  showBoughtItem,
}) => {
  const { user } = useContext(UserContext);
  return (
    <>
      {showSalesNotifications && (
        <>
          <Link
            to={`/item/${value.productId ? value.productId._id : null}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Tooltip title="View">
              <div
                className="container d-flex"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={value.buyerId ? value.buyerId.pic : null}
                  alt=""
                  srcset=""
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
                <div className="notification__title">
                  <h1
                    style={{
                      fontSize: "16px",
                      margin: "5px 0px",
                      padding: "10px",
                    }}
                  >
                    {value.buyerId ? value.buyerId.name : null} has sent request
                    to buy{" "}
                    {value.productId ? value.productId.productName : null}.
                  </h1>
                  <h6
                    className="text-xs ml-2 font-bold"
                    style={{ marginTop: "-5px" }}
                  >
                    At :{" "}
                    {new Date(value ? value.createdAt : null).toLocaleString()}
                  </h6>
                </div>
              </div>
            </Tooltip>
          </Link>
          <hr />
        </>
      )}

      {b && (
        <>
          <Link
            to={`/detail/view/${value ? value.buyerId : null}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <Tooltip title="View">
              <div
                className="container d-flex"
                style={{ display: "flex", alignItems: "center" }}
              >
                <img
                  src={value.productId ? value.productId.pic1 : null}
                  alt=""
                  srcset=""
                  style={{ width: "40px", height: "40px", borderRadius: "50%" }}
                />
                <div className="notification__title">
                  <h1
                    style={{
                      fontSize: "16px",
                      margin: "5px 0px 0px 0px",
                      padding: "10px",
                    }}
                  >
                    {user ? user.name : null}
                    {showBoughtItem
                      ? `You have successfully bought ${
                          value.productId ? value.productId.productName : null
                        }.Please check your email for more information.`
                      : `You have requested to buy ${
                          value.productId ? value.productId.productName : null
                        }.`}{" "}
                  </h1>
                  {!showBoughtItem && (
                    <h6
                      className="text-xs ml-2 font-bold"
                      style={{ marginTop: "-5px" }}
                    >
                      At :{" "}
                      {new Date(
                        value ? value.createdAt : null
                      ).toLocaleString()}
                    </h6>
                  )}
                </div>
              </div>
            </Tooltip>
          </Link>
          <hr />
        </>
      )}
    </>
  );
};

export default NotificationItem;
