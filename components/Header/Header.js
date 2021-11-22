import React from "react";
import Link from "next/link";
import API from "../API/API";
// import Notification from "./Notification";
import mainLogo from "./mainLogo.jpg";
import MobileNav from "../offcanvas/MobileNav";

const Header = ({ user }) => {
  const logout = async () => {
    try {
      await API.delete("/logout", {
        headers: { "Content-Type": "application/json" }
      });
      localStorage.setItem("token", "");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav
      className="navbar navbar-expand-sm navbar-light bg-white sticky-top vw-100 border-bottom p-0"
      id="navbar"
    >
      <div className="container-fluid d-flex justify-content-between align-items-center px-3">
        <div className="navbrand d-flex align-items-center justify-content-between">
          <a className="navbar-brand me-1">
            {" "}
            <img
              src={mainLogo.src}
              className="rounded-pill border"
              height="50px"
              width="50px"
              alt=""
            />{" "}
          </a>
          <div className="d-inline-block rounded-pill bg-light navsearch border p-2 overflow-hidden">
            <form className="h-100" action="">
              <button
                type="submit"
                className="bg-light bi bi-search navsearchbtn h-100"
              ></button>
              <input
                type="search"
                className="form-control h-100 d-none d-xl-inline w-auto ps-1 bg-light navsearchinp"
                name="search"
                placeholder="Search lifebook..."
              />
            </form>
          </div>
        </div>

        {/* middle navbar  */}

        <ul className="navbar-nav mid-nav justify-content-between d-flex">
          <li className="nav-item d-none d-md-block border-bottom border-primary">
            <Link passHref href="/">
              <a className="nav-link ">
                <span className="bi bi-house-door"></span>
              </a>
            </Link>
          </li>
          <li className="nav-item">
            <a  className="nav-link d-none d-md-block">
              <span className="bi bi-collection-play"></span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link d-none d-md-block">
              <span className="bi bi-shop"></span>
            </a>
          </li>
          <li className="nav-item">
            <a  className="nav-link d-none d-md-block">
              <span className="bi bi-people"></span>
            </a>
          </li>
          <li className="nav-item d-flex align-items-center">
            {/* <Notification currentUser={user} /> */}
          </li>
        </ul>

        {/* mobile off canvas  */}

        <button
          className="btn navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNav"
          aria-controls="offcanvasNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <MobileNav currentUser={user} />

        {/* right side navbar  */}

        <div className="d-none d-sm-block" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-lg-0 justify-content-end">
            <li className="nav-item navuname d-none d-xl-flex p-3 bg-light border border-primary me-1 rounded-pill">
              <Link
                className="nav-link "
                passHref
                href={`/profile?id=${user._id}`}
              >
                <a style={{ textDecoration: "none" }}>
                  {user.profile && (
                    <img
                      src={user.profile.profileImage}
                      className="d-inline rounded-pill"
                      height="35px"
                      width="35px"
                      alt={`${user?.name?.firstName} ${user?.name?.lastName}`}
                    />
                  )}
                  <p className="d-inline text-dark ps-2">{`${user?.name?.firstName} ${user?.name?.lastName}`}</p>
                </a>
              </Link>
            </li>
            <li className="nav-item rounded-pill border bg-light me-2 px-lg-0 px-xl-2">
              <a className="nav-link active" aria-current="page">
                <span className="bi bi-plus"></span>
              </a>
            </li>
            <li className="nav-item rounded-pill border bg-light me-2 px-lg-0 px-xl-2">
              <a className="nav-link" >
                <span className="bi bi-chat-dots-fill"></span>
              </a>
            </li>
            <li className="nav-item rounded-pill border bg-light me-2 px-lg-0 px-xl-2">
              <a className="nav-link">
                {" "}
                <span className="bi bi-bell"></span>
              </a>
            </li>
            <li className="nav-item rounded-pill border bg-light me-2 px-lg-0 px-xl-2 dropdown">
              <a
                className="nav-link"
                role="button"
                id="profiledrop"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="bi bi-caret-down-fill"></span>
              </a>
              <ul
                className="dropdown-menu nav-drop-down"
                aria-labelledby="profiledrop"
              >
                <li>
                  <Link href={`/profile?id=${user._id}`} passHref>
                    <a className="row p-3 w-100">
                      <div className="col-3">
                        <img
                          src={user.profile?.profileImage}
                          className="rounded-pill mt-1"
                          height="56px"
                          width="56px"
                          alt={`${user?.name?.firstName} ${user?.name?.lastName}`}
                        />
                      </div>
                      <div className="col-8 pt-2">
                        <h6 className="text-dark">{`${user?.name?.firstName} ${user?.name?.lastName}`}</h6>
                        <small className="text-muted">See your profile</small>
                      </div>
                    </a>
                  </Link>
                </li>
                <hr />
                <li>
                  <a className="row w-100 text-dark p-3">
                    <div className="col-3 p-2">
                      <div className="icon-drop-down rounded-pill bg-light">
                        <span className="bi bi-chat-left-quote-fill ps-2"></span>
                      </div>
                    </div>
                    <div className="col-9">
                      <h6 className="text-dark">Give FeedBack</h6>
                      <small className="text-muted">
                        help us improve new lifebook
                      </small>
                    </div>
                  </a>
                </li>
                <hr />
                <li>
                  <a className="row w-100 text-dark ps-1">
                    <div className="col-3 p-2">
                      <div className="icon-drop-down bg-light rounded-pill">
                        <span className="bi bi-gear ps-2"></span>
                      </div>
                    </div>
                    <div className="col-8 d-flex align-items-center">
                      <h6 className="text-dark">Settings & Privacy</h6>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="row w-100 text-dark ps-1">
                    <div className="col-3 p-2">
                      <div className="icon-drop-down bg-light rounded-pill">
                        <span className="bi bi-question-circle ps-2"></span>
                      </div>
                    </div>
                    <div className="col-8 d-flex align-items-center">
                      <h6 className="text-dark">Help & Support</h6>
                    </div>
                  </a>
                </li>
                <li>
                  <a className="row w-100 text-dark ps-1" >
                    <div className="col-3 p-2 ">
                      <div className="icon-drop-down bg-light rounded-pill">
                        <span className="bi bi-moon-fill ps-2"></span>
                      </div>
                    </div>
                    <div className="col-8 d-flex align-items-center">
                      <h6 className="text-dark">Display & Accessibility</h6>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    onClick={logout}
                    className="row w-100 text-dark ps-1"
                    
                  >
                    <div className="col-3 p-2">
                      <div className="icon-drop-down bg-light rounded-pill">
                        <span className="bi bi-box-arrow-left ps-2"></span>
                      </div>
                    </div>
                    <div className="col-8 d-flex align-items-center">
                      <h6 className="text-dark">Log Out</h6>
                    </div>
                  </a>
                </li>
                <hr />
                <li>
                  <div className="row w-100 text-muted ps-1">
                    <div className="col-12 p-2" style={{ fontSize: "1rem" }}>
                      <a className="px-2">
                        Privacy
                      </a>
                      .
                      <a className="px-2">
                        Terms
                      </a>
                      .
                      <a className="px-2">
                        Advertising
                      </a>
                      .
                      <a className="px-2">
                        Ad Choices
                      </a>
                      .
                      <a className="px-2">
                        Cookies
                      </a>
                      .
                      <a className="px-2">
                        More
                      </a>
                      . @lifebook 2021
                    </div>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
