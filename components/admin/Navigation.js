import React from "react";
import logo from "../Header/mainLogo.jpg";

const Navigation = () => {
  return (
    <div className="bg-primary text-white mt-3">
      <div className="border-bottom p-3 d-flex justify-content-center w-100 align-items-center">
        <img src={logo.src} alt="" style={{height: "45px", width: "45px"}} />
        <h3 className="ps-3" style={{fontFamily: "poppins"}}>Lifebook</h3>
      </div>
      <div className="dashboard ">
        <ul>
          <li>
            <a className=" d-flex justify-content-start active">
              <span className="bi bi-list me-3"></span>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a className=" d-flex justify-content-start">
              <span className="bi bi-person me-3"></span>
              <span>Users</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navigation;
