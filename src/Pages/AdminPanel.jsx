import React, { useContext } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { UserContext } from "../Context/User";
import { useEffect } from "react";
import { apiRequestHelper } from "../Helpers/ApiHelpers";
import { useState } from "react";
import NoAuth from "../Components/NoAuth/NoAuth";
import SuccessMessage from "../Common/SuccessMessage";

const AdminPanel = () => {
  const { user, error } = useContext(UserContext);
  const [allUsers, setAllUsers] = useState([]);
  const [authError, setAuthError] = useState("");
  const [allPost, setAllPost] = useState([]);
  const [render, setRender] = useState(false);
  const [endIndex, setEndIndex] = useState(10);
  const [succesfulllyDeleted, setSuccefullyDeleted] = useState(false);
  const [endIndexOfUser, setEndIndexOfUser] = useState(10);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await apiRequestHelper(
        "user/all",
        "get",
        {},
        { userid: user._id }
      );
      console.log(response);
      if (response.statusCode === 400) {
        setAuthError(response.message);
      }
      response.statusCode === 200 && setAuthError("");
      response.statusCode === 200 && setAllUsers(response.data);
    };

    const fetchPosts = async () => {
      const data = await apiRequestHelper(
        "posts/all",
        "get",
        {},
        { userid: user._id }
      );
      if (data.statusCode === 400) {
        setAuthError(data.message);
      }
      data.statusCode === 200 && setAuthError("");

      data.statusCode === 200 &&
        setAllPost(data.data !== "No post at all" ? data.data : null);
    };

    fetchUser();
    fetchPosts();
  }, [user, render]);

  const handelDeleteUser = async (id) => {
    const response = await apiRequestHelper(
      `user/delete/${id}`,
      "delete",
      {},
      { userid: user._id }
    );
    response.statusCode === 200 && setRender(!render);
    response.statusCode === 200 && setSuccefullyDeleted(true);
  };
  const handelDeletePost = async (id) => {
    const response = await apiRequestHelper(
      `post/delete/${id}`,
      "delete",
      {},
      { userid: user._id }
    );
    response.statusCode === 200 && setRender(!render);
    response.statusCode === 200 && setSuccefullyDeleted(true);
  };
  const handleClose = () => {
    setSuccefullyDeleted(false);
  };
  return (
    <>
      <SuccessMessage
        open={succesfulllyDeleted}
        handleClose={handleClose}
        message="Succesfully Deleted"
      />
      {error === "" ? (
        <>
          {authError ? (
            <h1 className="my-2 font-normal text-xl">
              {user.email} you are not Admin
            </h1>
          ) : (
            <div className="container-fluid mt-2">
              <h2 className="font-bold text-xl">Admin panel</h2>
              <div>
                <section className="text-gray-600 body-font">
                  <div className="container px-5 py-10 mx-auto">
                    <div className="flex justify-center flex-wrap -m-4 text-center">
                      <div className="p-1 md:w-1/6 sm:w-1/4 w-full">
                        <div className="border-2 border-gray-200 px-1 py-2 rounded-lg">
                          <h2 className="title-font font-medium text-3xl text-gray-900">
                            2.7K
                          </h2>
                          <p className="leading-relaxed">Posts</p>
                        </div>
                      </div>
                      <div className="p-1 md:w-1/6 sm:w-1/4 w-full">
                        <div className="border-2 border-gray-200 px-1 py-2 rounded-lg">
                          <h2 className="title-font font-medium text-3xl text-gray-900">
                            1.3K
                          </h2>
                          <p className="leading-relaxed">Users</p>
                        </div>
                      </div>
                      <div className="p-1 md:w-1/6 sm:w-1/4 w-full">
                        <div className="border-2 border-gray-200 px-1 py-2 rounded-lg">
                          <h2 className="title-font font-medium text-3xl text-gray-900">
                            74
                          </h2>
                          <p className="leading-relaxed">Daily Trades</p>
                        </div>
                      </div>
                      <div className="p-1 md:w-1/6 sm:w-1/4 w-full">
                        <div className="border-2 border-gray-200 px-1 py-2 rounded-lg">
                          <h2 className="title-font font-medium text-3xl text-gray-900">
                            46
                          </h2>
                          <p className="leading-relaxed">Active Users</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              {/* User List */}
              <div className="flex justify-evenly">
                <div>
                  <h4 className="font-normal text-xl mb-2">User List</h4>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Index</th>
                        <th scope="col">Username</th>
                        <th scope="col">E-mail</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers
                        .slice(0, endIndexOfUser - 1)
                        .map((user, index) => {
                          return (
                            <tr>
                              <td scope="row">{index + 1}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>

                              <td>
                                <DeleteForeverIcon
                                  onClick={() => handelDeleteUser(user._id)}
                                  className="text-red-600 cursor-pointer"
                                />
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  <button
                    onClick={() =>
                      setEndIndexOfUser((prevalue) => prevalue + 10)
                    }
                  >
                    Show more
                  </button>
                  <button
                    className="ml-3"
                    onClick={() =>
                      endIndex === 10
                        ? setEndIndexOfUser(10)
                        : setEndIndexOfUser((prevalue) => prevalue - 10)
                    }
                  >
                    Show Less
                  </button>
                </div>
                {/* Produst List */}
                <div>
                  <h4 className="font-normal text-xl mb-2">Product List</h4>
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th scope="col">Index</th>
                        <th scope="col">Username</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Category</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allPost
                        ? allPost.slice(0, endIndex - 1).map((post, index) => {
                            return (
                              <tr>
                                <td scope="row">{index + 1}</td>
                                <td>{post.userId ? post.userId.name : null}</td>
                                <td>{post ? post.productName : null}</td>
                                <td>{post ? post.productCategory : null}</td>
                                <td>
                                  <DeleteForeverIcon
                                    onClick={() => handelDeletePost(post._id)}
                                    className="text-red-600 cursor-pointer"
                                  />
                                </td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                  <button
                    onClick={() => setEndIndex((prevalue) => prevalue + 10)}
                  >
                    Show more
                  </button>
                  <button
                    className="ml-3"
                    onClick={() =>
                      endIndex === 10
                        ? setEndIndex(10)
                        : setEndIndex((prevalue) => prevalue - 10)
                    }
                  >
                    Show Less
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <NoAuth />
      )}
    </>
  );
};

export default AdminPanel;
