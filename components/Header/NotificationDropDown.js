import React from "react";
import SingleNotification from "./SingleNotification";
import Link from "next/link";

const NotificationDropDown = ({ user, notification, mobile }) => {
  console.log(notification);
  if (mobile) {
    if (!notification) {
      return (
        <ul
          className="placeholder-glow shadow border rounded py-0"
          aria-labelledby="notificationdrop"
          style={{listStyleType: "none"}}
        >
          <li>
            <a className="row p-3 w-100">
              <span className="placeholder text-dark col-12 me-2"></span>
              <span className="placeholder text-dark col-12 me-2 my-2"></span>
            </a>
          </li>
          <li>
            <a className="row p-3 w-100">
              <span className="placeholder text-dark col-12 me-2"></span>
              <span className="placeholder text-dark col-12 me-2 my-2"></span>
            </a>
          </li>
          <hr />
          <li>
            <a className="row p-3 w-100">
              <span className="placeholder text-dark col-12 me-2"></span>
              <span className="placeholder text-dark col-12 me-2 my-2"></span>
            </a>
          </li>

          <li>
            <a className="row p-3 w-100">
              <span className="placeholder text-dark col-12 me-2"></span>
              <span className="placeholder text-dark col-12 me-2 my-2"></span>
            </a>
          </li>

          <li>
            <a className="row p-3 w-100">
              <span className="placeholder text-dark col-12 me-2"></span>
              <span className="placeholder text-dark col-12 me-2 my-2"></span>
            </a>
          </li>
        </ul>
      );
    }
    return (
      <ul
        className=" placeholder-glow bg-white shadow border rounded py-0 px-2"
        style={{listStyleType: "none"}}
        aria-labelledby="notificationdrop"
      >
        {notification.unread.length > 0 &&
          notification.unread.map((notify) => (
            <SingleNotification notify={notify} key={notify} />
          ))}
        {notification.read.length > 0 &&
          notification.read.map((notify) => (
            <SingleNotification notify={notify} key={notify} />
          ))}
      </ul>
    );
  } else {
    if (!notification) {
      return (
        <ul
          className="dropdown-menu nav-drop-down placeholder-glow shadow border rounded py-0"
          aria-labelledby="notificationdrop"
        >
          <li>
            <a className="row p-3 w-100">
              <span className="placeholder text-dark col-12 me-2"></span>
              <span className="placeholder text-dark col-12 me-2 my-2"></span>
            </a>
          </li>
          <li>
            <a className="row p-3 w-100">
              <span className="placeholder text-dark col-12 me-2"></span>
              <span className="placeholder text-dark col-12 me-2 my-2"></span>
            </a>
          </li>
          <hr />
          <li>
            <a className="row p-3 w-100">
              <span className="placeholder text-dark col-12 me-2"></span>
              <span className="placeholder text-dark col-12 me-2 my-2"></span>
            </a>
          </li>

          <li>
            <a className="row p-3 w-100">
              <span className="placeholder text-dark col-12 me-2"></span>
              <span className="placeholder text-dark col-12 me-2 my-2"></span>
            </a>
          </li>

          <li>
            <a className="row p-3 w-100">
              <span className="placeholder text-dark col-12 me-2"></span>
              <span className="placeholder text-dark col-12 me-2 my-2"></span>
            </a>
          </li>
        </ul>
      );
    }
    return (
      <ul
        className="dropdown-menu nav-drop-down placeholder-glow shadow border rounded py-0"
        aria-labelledby="notificationdrop"
      >
        {notification.unread.length > 0 &&
          notification.unread.map((notify) => (
            <SingleNotification notify={notify} key={notify} />
          ))}
        {notification.read.length > 0 &&
          notification.read.map((notify) => (
            <SingleNotification notify={notify} key={notify} />
          ))}
      </ul>
    );
  }
};

export default NotificationDropDown;
