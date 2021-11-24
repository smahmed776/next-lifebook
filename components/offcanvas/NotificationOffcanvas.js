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
      <div className="offcanvas-header justify-content-center flex-column">
        <button
          type="button"
          className="btn-close text-reset text-center"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
        <h3 className="p-2 my-2">Notifications</h3>
      </div>
      <div className="offcanvas-body justify-content-center align-items-center">
        <NotificationDropDown user={user} notification={notification} mobile={true} />
      </div>
    </div>
  );
};

export default NotificationOffcanvas;
