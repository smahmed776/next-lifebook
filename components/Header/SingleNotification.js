import React, { useEffect, useState, useRef } from "react";
import API from "../API/API";
import Link from "next/link";
import Moment from "react-moment";

const SingleNotification = ({ notify }) => {
  const [name, setName] = useState(null);
  const [notificationIconbg, setNotificationbg] = useState("bg-primary");
  const [authorName, setAuthorName] = useState("");
  const [profImg, setProfImg] = useState(null);
  const reqsuccess = useRef();
  const confirmbtn = useRef();
  const rejectbtn = useRef();

  const getIcon = (type) => {
    if (type === "like") {
      return (
        <div
          className={
            "d-flex justify-content-center align-items-center position-absolute rounded-pill bg-primary"
          }
          style={{
            height: "30px",
            width: "30px",
            right: "-5px",
            bottom: "-2px",
          }}
        >
          <span className="bi bi-hand-thumbs-up-fill text-white "></span>
        </div>
      );
    } else if (type === "comment") {
      return (
        <div
          className={
            "d-flex justify-content-center align-items-center position-absolute rounded-pill bg-success"
          }
          style={{
            height: "30px",
            width: "30px",
            right: "-5px",
            bottom: "-2px",
          }}
        >
          <span className="bi bi-chat-square-fill text-white"></span>
        </div>
      );
    } else if (type === "friendRequest") {
      return (
        <div
          className={
            "d-flex justify-content-center align-items-center position-absolute rounded-pill bg-primary"
          }
          style={{
            height: "30px",
            width: "30px",
            right: "-5px",
            bottom: "-2px",
          }}
        >
          <span className="bi bi-person-fill text-white"></span>
        </div>
      );
    } else if (type === "confirmRequest") {
      return (
        <div
          className={
            "d-flex justify-content-center align-items-center position-absolute rounded-pill bg-success"
          }
          style={{
            height: "30px",
            width: "30px",
            right: "-5px",
            bottom: "-2px",
          }}
        >
          <span className="bi bi-person-check-fill text-white"></span>
        </div>
      );
    } else if (type === "rejectRequest") {
      setNotificationbg("bg-danger");
      return (
        <div
          className={
            "d-flex justify-content-center align-items-center position-absolute rounded-pill bg-danger"
          }
          style={{
            height: "30px",
            width: "30px",
            right: "-5px",
            bottom: "-2px",
          }}
        >
          <span className="bi bi-person-x-fill text-white"></span>
        </div>
      );
    }
  };

  const fetchAuthor = async () => {
    const res = await API.post(
      "/userinfo",
      {
        buddy_id: notify.author_id,
        information: [
          "name",
          "username",
          "profile.profileImage"
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setAuthorName(`${res.data[0]?.name.firstName} ${res.data[0]?.name.lastName}`);
  };
  const fetchUser = async () => {
    const res = await API.post(
      "/userinfo",
      {
        buddy_id: notify.buddy_id.length === 1 ? notify.buddy_id : [notify.buddy_id[notify.buddy_id.length -1 ], notify.buddy_id[notify.buddy_id.length - 2]],
        information: [
          "name",
          "username",
          "profile.profileImage"
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    setName(res.data);
    setProfImg(res.data[0]?.profile?.profileImage);
  };

  const confirmRequest = async (id) => {
    await API.put(
      `/confirmrequest/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const rejectRequest = async (id) => {
    await API.put(
      `/rejectrequest/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  useEffect(() => {
    fetchUser();
    fetchAuthor()
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
    <li className="border-bottom p-2" key={notify}>
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
              {getIcon(notify.type)}
            </div>
          )}
        </div>
        <div className="col-9">
          <div className="d-flex flex-column flex-wrap">
            {notify.type === "like" && (
              <div className="w-100">
                <p className="notification-para mb-0 pb-0 w-100">
                  {notify.buddy_id.length === 1 &&
                    `${name[0]?.name.firstName} ${name[0]?.name.lastName} has liked your `}
                  {notify.buddy_id.length == 2 &&
                    `${name[0]?.name.firstName} ${name[0]?.name.lastName} and ${name[1]?.name.firstName} ${name[1]?.name.lastName} liked your `}
                  {notify.buddy_id.length > 2 &&
                    `${name[0]?.name.firstName} ${name[0]?.name.lastName}, ${
                      name[1]?.name.firstName
                    } ${name[1]?.name.lastName} and ${
                      notify.buddy_id.length - 2
                    } others liked your `}

                  <Link
                    href={`/posts/${notify.post_id}`}
                    style={{ paddingLeft: ".5rem", textDecoration: "none" }}
                  >
                    Post
                  </Link>
                </p>
              </div>
            )}
            {notify.type === "comment" && (
              <div className="w-100">
                <p className="notification-para mb-0 pb-0 w-100">
                  {notify.buddy_id.length === 1 &&
                    `${name[0]?.name.firstName} ${name[0]?.name.lastName} has commented on your `}
                  {notify.buddy_id.length == 2 &&
                    `${name[0]?.name.firstName} ${name[0]?.name.lastName} and ${name[1]?.name.firstName} ${name[1]?.name.lastName} commented on your `}
                  {notify.buddy_id.length > 2 &&
                    `${name[0]?.name.firstName} ${name[0]?.name.lastName}, ${
                      name[1]?.name.firstName
                    } ${name[1]?.name.lastName} and ${
                      notify.buddy_id.length - 2
                    } others commented on your `}

                  <Link
                    href={`/posts/${notify.post_id}`}
                    style={{ paddingLeft: ".5rem", textDecoration: "none" }}
                  >
                    Post
                  </Link>
                </p>
              </div>
            )}
            {notify.type === "friendRequest" && (
              <div className="w-100">
                <p className="notification-para mb-0 pb-0 w-100">
                  {notify.buddy_id.length === 1 && (
                    <Link passHref href={`/profile/${notify.buddy_id[0]}`}>
                      <a>
                        {`${name[0]?.name.firstName} ${name[0]?.name.lastName} `}
                      </a>
                    </Link>
                  )}{" "}
                  has sent you a friend request.
                </p>
                <div className="d-flex w-100 justify-content-around mt-2">
                  <div className="d-none" ref={reqsuccess}>
                    Request confirmed.
                  </div>
                  <button
                    className="btn btn-primary bi bi-check"
                    ref={confirmbtn}
                    onClick={(e) => {
                      reqsuccess.current.classList.remove("d-none");
                      reqsuccess.current.classList.add("text-success");
                      reqsuccess.current.innerHTML = "Request Confirmed";
                      confirmRequest(notify.buddy_id[0]);
                      e.target.classList.add("d-none");
                      rejectbtn.current.classList.add("d-none");
                    }}
                  >{` Confirm`}</button>
                  <button
                    className="btn btn-danger bi bi-x"
                    ref={rejectbtn}
                    onClick={(e) => {
                      reqsuccess.current.classList.remove("d-none");
                      reqsuccess.current.classList.add("text-warning");
                      reqsuccess.current.innerHTML = "Request rejected!";
                      rejectRequest();
                      e.target.classList.add("d-none");
                      rejectbtn.current.classList.add("d-none");
                    }}
                  >{` Reject`}</button>
                </div>
              </div>
            )}
            {notify.type === "confirmRequest" && (
              <div className="w-100">
                <p className="notification-para mb-0 pb-0 w-100">
                  {notify.buddy_id.length === 1 && (
                    <Link passHref href={`/profile/${notify.buddy_id[0]}`}>
                      <a>
                        {`${name[0]?.name.firstName} ${name[0]?.name.lastName} `}
                      </a>
                    </Link>
                  )}
                  has accepted your friend request.
                </p>
              </div>
            )}
            {notify.type === "rejectRequest" && (
              <div className="w-100">
                <p className="notification-para mb-0 pb-0 w-100">
                  {notify.buddy_id.length === 1 && (
                    <Link passHref href={`/profile/${notify.buddy_id[0]}`}>
                      <a>
                        {`${name[0]?.name.firstName} ${name[0]?.name.lastName} `}
                      </a>
                    </Link>
                  )}
                  has rejected your friend request.
                </p>
              </div>
            )}

            {notify.type === "replycomment" && (
              <div className="w-100">
                <p className="notification-para mb-0 pb-0 w-100">
                  {notify.buddy_id.length === 1 &&
                    `${name[0]?.name.firstName} ${name[0]?.name.lastName} has also commented on `}
                  {notify.buddy_id.length == 2 &&
                    `${name[0]?.name.firstName} ${name[0]?.name.lastName} and ${name[1]?.name.firstName} ${name[1]?.name.lastName} also commented on `}
                  {notify.buddy_id.length > 2 &&
                    `${name[0]?.name.firstName} ${name[0]?.name.lastName}, ${
                      name[1]?.name.firstName
                    } ${name[1]?.name.lastName} and ${
                      notify.buddy_id.length - 2
                    } others also commented on `}
                  {notify.author_id && `${authorName}'s `}
                  <Link
                    href={`/posts/${notify.post_id}`}
                    style={{ paddingLeft: ".5rem", textDecoration: "none" }}
                  >
                    Post
                  </Link>
                </p>
              </div>
            )}
            <div className="d-flex justify-content-end mt-2 w-100">
              <p className="text-muted m-0 pe-2">
                <Moment fromNow interval={2000}>
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
