import React from "react";
import Link from "next/link";
import { callApi } from "../globalcontext/callApi";

const MobileNav = ({ currentUser, logout }) => {
  return (
    <div
      className="offcanvas offcanvas-start d-sm-none bg-light"
      tabIndex="-1"
      id="offcanvasNav"
      aria-labelledby="offcanvasNavLabel"
    >
      <div className="offcanvas-header justify-content-center">
        <button
          type="button"
          className="btn-close text-reset text-center"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        />
      </div>
      <div className="offcanvas-body justify-content-center align-items-center">
        <ul className="navbar-nav justify-content-center me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <button
              className="btn w-100"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <Link
                className="nav-link"
                passHref
                href={`/profile/${currentUser._id}`}
              >
                <div className="row m-0 w-100 p-2 bg-white">
                  <div className="col-3 m-0 d-flex justify-content-center align-items-center ">
                    <img
                      src={currentUser.profile?.profileImage}
                      className="d-inline rounded-pill"
                      height={45}
                      width={45}
                      loading="lazy"
                      alt={`${currentUser?.name?.firstName} ${currentUser?.name?.lastName}`}
                      style={{objectFit: "cover"}}
                    />
                  </div>
                  <div className="col-9 m-0 d-flex justify-contetnt-start flex-column">
                    <p className="text-start text-dark mb-1 d-flex justify-content-start align-items-center">
                      {`${currentUser?.name?.firstName} ${currentUser?.name?.lastName}`}
                  {currentUser?.verified === true && <span className="bi bi-check rounded-pill ms-2 d-inline-flex justify-content-center align-items-center p-2 text-white bg-primary" style={{height: "15px", width: "15px"}}></span>}
                      
                    </p>
                    <p className="text-start text-muted m-0">
                      See your profile
                    </p>
                  </div>
                </div>
              </Link>
            </button>
          </li>
          <hr />
          <div className="row row-cols-2 gx-3 gy-3 my-2 px-3">
            <div className="col">
              <Link
                passHref
                href="#"
                className="text-dark"
                style={{ textDecoration: "none" }}
              >
                <div className="d-flex flex-column align-items-center bg-white border p-2">
                  <span className="bi bi-bookmark" />
                  <p>Saved</p>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                passHref
                href="#"
                className="text-dark"
                style={{ textDecoration: "none" }}
              >
                <div className="d-flex flex-column align-items-center bg-white border p-2">
                  <span className="bi bi-collection" />
                  <p>Videos</p>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                passHref
                href="#"
                className="text-dark"
                style={{ textDecoration: "none" }}
              >
                <div className="d-flex flex-column align-items-center bg-white border p-2">
                  <span className="bi bi-flag" />
                  <p>Pages</p>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                passHref
                href="#"
                className="text-dark"
                style={{ textDecoration: "none" }}
              >
                <div className="d-flex flex-column align-items-center bg-white border p-2">
                  <span className="bi bi-shop" />
                  <p>Marketplace</p>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                passHref
                href="#"
                className="text-dark"
                style={{ textDecoration: "none" }}
              >
                <div className="d-flex flex-column align-items-center bg-white border p-2">
                  <span className="bi bi-people" />
                  <p>Groups</p>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                passHref
                href="#"
                className="text-dark"
                style={{ textDecoration: "none" }}
              >
                <div className="d-flex flex-column align-items-center bg-white border p-2">
                  <span className="bi bi-person" />
                  <p>Friends</p>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                passHref
                href="#"
                className="text-dark"
                style={{ textDecoration: "none" }}
              >
                <div className="d-flex flex-column align-items-center bg-white border p-2">
                  <span className="bi bi-calendar" />
                  <p>Events</p>
                </div>
              </Link>
            </div>
            <div className="col">
              <Link
                passHref
                href="#"
                className="text-dark"
                style={{ textDecoration: "none" }}
              >
                <div className="d-flex flex-column align-items-center bg-white border p-2">
                  <span className="bi bi-gear" />
                  <p>Settings</p>
                </div>
              </Link>
            </div>
          </div>
          {/* <li className="nav-item rounded-pill border bg-light me-2 px-2">
                    <a className="nav-link active" href="#" aria-current="page" ><span className="bi bi-plus"></span></a>
                </li>
                <li className="nav-item rounded-pill border bg-light me-2 px-2">
                    <a className="nav-link" href="#about-me" ><span className="bi bi-chat-fill"></span></a>
                </li>
                <li className="nav-item rounded-pill border bg-light me-2 px-2">
                    <a className="nav-link" href="#my-skills" > <span className="bi bi-bell"></span></a>
                </li>
                <li className="nav-item rounded-pill border bg-light me-2 px-2 dropstart">
                    <a className="nav-link" href="#my-works" role="button" id="profiledrop" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="bi bi-caret-down-fill"></span>
                    </a>
                    <ul class="dropdown-menu" aria-labelledby="profiledrop">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                    </ul>
                </li> */}
          <button
            type="button"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
            className="btn btn-secondary w-100 "
            onClick={() => logout()}
          >
            {" "}
            Log Out{" "}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;
