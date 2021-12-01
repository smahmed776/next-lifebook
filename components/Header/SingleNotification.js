import React, { useEffect, useState } from "react";
import API from "../API/API";
import Link from "next/link";
import Moment from "react-moment";

const SingleNotification = ({ notify }) => {
  const [name, setName] = useState(null);
  const [profImg, setProfImg] = useState(null);

  const getIcon = (type) => {
    if (type === "like") {
      return "bi bi-hand-thumbs-up-fill text-white ";
    } else if (type === "comment") {
      return "bi bi-chat-fill text-white ";
    } else if (type === "friendRequest") {
      return "bi bi-person-plus-fill text-white";
    }
  };

  const fetchUser = async () => {
    const res = await API.get("/userinfo", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${notify.buddy_id[0]} ${notify.buddy_id[1]}`,
      },
    });
    setName(res.data.users);
    setProfImg(res.data.users[0]?.profileImage);
  };

  useEffect(() => {
    fetchUser();
  }, [notify]);
  if (!name) {
    return (
      <li>
        <a className="row p-3 w-100">
          <span className="placeholder text-dark col-12 me-2"></span>
          <span className="placeholder text-dark col-12 me-2 my-2"></span>
        </a>
      </li>
    );
  }
  return (
    <li className="border-bottom" key={notify}>
      <div className="row m-0 w-100 align-items-start pt-2 gx-0 gy-0">
        <div className="col-3 p-0 d-flex justify-content-center">
          {profImg && (
            <div
              className="position-relative rounded-pill"
              style={{ height: "55px", width: "55px" }}
            >
              <img
                src={profImg}
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
              <div
                className="d-flex justify-content-center align-items-center position-absolute bg-primary rounded-pill"
                style={{
                  height: "30px",
                  width: "30px",
                  right: "-5px",
                  bottom: "-2px",
                }}
              >
                <span className={`${getIcon(notify.type)} `}></span>
              </div>
            </div>
          )}
        </div>
        <div className="col-9">
          <div className="d-flex flex-column flex-wrap">
            {notify.type !== "friendRequest" && (
              <div className="w-100">
                <p className="notification-para mb-0 pb-0 w-100">
                  {notify.buddy_id.length === 1 &&
                    `${name[0]?.name.firstName} ${name[0]?.name.lastName} has`}
                  {notify.buddy_id.length == 2 &&
                    `${name[0]?.name.firstName} ${name[0]?.name.lastName} and ${name[1]?.name.firstName} ${name[1]?.name.lastName}`}
                  {notify.buddy_id.length > 2 &&
                    `${name[0]?.name.firstName}, ${
                      name[1]?.name.firstName
                    } and ${notify.buddy_id.length - 2} others `}
                  {notify.type === "like" && " liked your "}
                  {notify.type === "comment" && " commented on your "}
                  {notify.type === "friendRequest" &&
                    "sent you a friend request."}
                  {notify.type !== "friendRequest" && (
                    <Link
                      href={`/posts/${notify.post_id}`}
                      style={{ paddingLeft: ".5rem", textDecoration: "none" }}
                    >
                      Post
                    </Link>
                  )}
                </p>
              </div>
            )}
            {notify.type === "friendRequest" && (
              <div className="w-100">
                <p className="notification-para mb-0 pb-0 w-100">
                  {notify.buddy_id.length === 1 && (
                    <Link passHref href={`/profile/${notify.buddy_id[0]}`}>
                      <a>
                        {`${name[0]?.name.firstName} ${name[0]?.name.lastName}`}
                      </a>
                    </Link>
                  )}{" "}
                  has sent you a friend request.
                </p>
                <div className="d-flex w-100 justify-content-around mt-2">
                  <button className="btn btn-primary bi bi-check">{` Confirm`}</button>
                  <button className="btn btn-danger bi bi-x">{` Reject`}</button>
                </div>
              </div>
            )}
            <div className="d-flex justify-content-end mt-2 w-100">
              <p className="text-muted m-0 pe-2">
                <Moment fromNow interval={1000}>
                  {notify.created}
                </Moment>
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default SingleNotification;
