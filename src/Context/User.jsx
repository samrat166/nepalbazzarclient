import React, { createContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { pathname } = useLocation();
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(false);
  const [error, setError] = useState("");
  const [render1, setRender1] = useState(false);
  const [userData1, setUserData1] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      setUserLoading(true);
      const userData = JSON.parse(localStorage.getItem("userInfo"));
      setUserData1(userData);
      try {
        const { data } = await axios.get(
          `http://localhost:4000/api/v1/user/details/${
            userData ? userData._id : null
          }`,
          {
            headers: {
              "auth-token": userData ? userData.token : null,
            },
          }
        );
        setUser(data.user);
        setUserLoading(false);
        setError("");
      } catch (error) {
        setError(error.response.data.msg);
        setUserLoading(false);
      }
    };
    fetchUserData();
  }, [pathname, render1]);

  const context = {
    user,
    setUser,
    userLoading,
    error,
    setRender1,
    render1,
    userData1,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

export default UserProvider;
