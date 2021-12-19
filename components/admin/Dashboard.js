import React, { useEffect, useState } from "react";
import PieChart from "./PieChart";
import Navigation from "./Navigation";
import BarChart from "./BarChart";
import API from "../API/API";
import Link from "next/link";
import Statistics from "./Statistics";
import AdminEditUser from "../Modals/AdminEditUser";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const fetchUsers = async () => {
    const res = await API.post(
      "/admin/users",
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setUsers(res.data.users);
    setPosts(res.data.posts);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="px-0 px-sm-1">
      <div className="row m-0 p-0 p-sm-2 gx-0 gx-sm-2 w-100">
        <div className="col-12 col-sm-3">
          <Navigation />
        </div>

        <div className="col-12 col-sm-9">
          <div className="row w-100 m-0 row-cols-md-3 row-cols-2 gx-2 gx-sm-3 gy-3 mb-3">
            <Statistics
              title="TOTAL USERS"
              count={users.length > 0 && `${users.length}+`}
              icon="bi bi-person-plus"
              iconBg="bg-primary"
              increasing={false}
              decreasing={true}
            />
            <Statistics
              title="TOTAL POSTS"
              count={posts.length > 0 && `${posts.length}+`}
              icon="bi bi-chat-text-fill"
              iconBg="bg-info"
              increasing={true}
              decreasing={false}
            />
            <Statistics
              title="TOTAL REACTIONS"
              count="175+"
              icon="bi bi-emoji-smile"
              iconBg="bg-warning"
              increasing={true}
              decreasing={false}
            />
          </div>
          <div className="row row-cols-1 row-cols-md-2 gx-1 gx-sm-3 gy-3 m-0 w-100 my-3">
            <BarChart />
            <PieChart />
          </div>
          <div className="my-2 p-3 bg-white border">
            <h3 className="border-bottom p-3 text-center">
              Users {users.length > 0 && ` (${users.length})`}
            </h3>
            <div
              className="table-responsive"
              style={{ maxHeight: "450px", overflowY: "scroll" }}
            >
              <table className="table table-striped table-hover">
                <caption>List of Users</caption>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ID</th>
                    <th scope="col">IMAGE</th>
                    <th scope="col">NAME</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">USERNAME</th>
                    <th scope="col">DOB</th>
                    <th scope="col">POSTS</th>
                    <th scope="col">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 &&
                    users.map((user, index) => {
                      if (user.clearance !== "admin") {
                        return (
                          <Fragment key={index}>
                            <AdminEditUser id={`user${index}Modal`} user={user} />
                          <tr >
                            <th scope="row">{index}</th>
                            <td>{user._id}</td>
                            <td>
                              <img
                                src={user.profile.profileImage}
                                alt={user.name.firstName}
                                className="rounded-pill"
                                style={{
                                  height: "45px",
                                  width: "45px",
                                  objectFit: "cover",
                                }}
                              />
                            </td>
                            <td>{`${user.name.firstName} ${user.name.lastName}`}</td>
                            <td>{user.email}</td>
                            <td>
                              <Link
                                href={`/profile/${user.username}`}
                                target="_blank"
                                passHref
                              >
                                <a
                                  target="_blank"
                                  className="text-decoration-none"
                                >{`@${user.username}`}</a>
                              </Link>
                            </td>
                            <td>{user.Dob}</td>
                            <td>
                              {user.profile?.posts?.length > 0
                                ? user.profile.posts.length
                                : 0}
                            </td>
                            <td>
                              <div className="d-flex justify-content-evenly align-items-center">
                                <button
                                  type="button"
                                  className="btn btn-info  bi bi-eye m-2"
                                ></button>
                                <button
                                  type="button"
                                  className="btn btn-warning bi bi-pen m-2"
                                  data-bs-toggle="modal"
                                  data-bs-target={`#user${index}Modal`}
                                ></button>
                                <button
                                  type="button"
                                  className="btn btn-danger bi bi-trash m-2"
                                ></button>
                              </div>
                            </td>
                          </tr>
                          </Fragment>
                        );
                      }
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
