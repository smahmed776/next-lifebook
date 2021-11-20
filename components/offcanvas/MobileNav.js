import React from "react";
import Link from "next/link";
import { useApi } from "../globalcontext/useApi";

const MobileNav = ({ currentUser }) => {
  const logout = async () => {
    try {
      await API.delete("/logout", {
        headers: { "Content-Type": "application/json" }
      });
      localStorage.setItem("token", "");
      window.location.replace("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="offcanvas offcanvas-start d-sm-none bg-light"
      tabindex="-1"
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
              className="btn"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            >
              <Link
                className="nav-link"
                passHref
                href={`/profile?id=${currentUser._id}`}
              >
                <div className="row m-0">
                  <div className="col-2 m-0 ">
                    <img
                      src={currentUser.image}
                      className="d-inline rounded-pill"
                      height="35px"
                      width="35px"
                      alt={currentUser.name}
                    />
                  </div>
                  <div className="col-10 m-0">
                    <p className="d-inline text-dark ps-2">
                      {currentUser.name}
                    </p>
                    <p className="text-muted">See your profile</p>
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
            className="btn btn-secondary w-100 "
            onClick={logout}
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
