import React from "react";
import Link from "next/link";
import NotificationDropDown from "../Header/NotificationDropDown";

const NotificationOffcanvas = ({ notification, user }) => {
  return (
    <div
      className="offcanvas offcanvas-start d-sm-none bg-light"
      tabIndex="-1"
      id="notificationcanvas"
      aria-labelledby="notificationcanvasLabel"
    >
      <div className="offcanvas-header justify-content-center p-1">
        <h3 className="p-2 col-10 my-2 text-center">Notifications</h3>
        <button
          type="button"
          className="btn-close col-2 text-reset text-center"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body notification-offcanvas justify-content-center align-items-center p-0">
        <NotificationDropDown user={user} notification={notification} mobile={true} />
      </div>
    </div>
  );
};

export default NotificationOffcanvas;
