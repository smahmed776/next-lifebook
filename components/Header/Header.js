import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import API from "../API/API";
import mainLogo from "./mainLogo.jpg";
import MobileNav from "../offcanvas/MobileNav";
import NotificationDropDown from "./NotificationDropDown";
import NotificationOffcanvas from "../offcanvas/NotificationOffcanvas";

const Header = ({ user, notificationCount }) => {
  const [notification, setNotification] = useState(null);
  const [needTofetch, setNeedTofetch] = useState(true);
  const [n_count, setN_count] = useState(0);
  const history = useRouter();
  const logout = async () => {
    await API.delete("/logout", {
      headers: { "Content-Type": "application/json" },
    });
    history.reload();
  };
  const fetchNotification = async () => {
    const res = await API.get("/notification", {
      headers: { "Content-Type": "application/json" },
    });
    setNotification(res.data);
  };
  const makeRead = async () => {
    await API.put("/readnotification", {user_id : user._id}, {
      headers: { "Content-Type": "application/json" },
    });
  };

  useEffect(()=> {
    setN_count(notificationCount)
  }, [notificationCount])
  return (
    <nav
      className="navbar navbar-expand-sm navbar-light bg-white sticky-top vw-100 border-bottom p-0"
      id="navbar"
    >
      <div className="container-fluid d-flex justify-content-between align-items-center px-3">
        <div className="navbrand d-flex align-items-center justify-content-between">
          <Link href="/" passHref>
            <a className="navbar-brand me-1">
              <img
                src={mainLogo.src}
                className="rounded-pill border"
                height="50px"
                width="50px"
                alt=""
              />{" "}
            </a>
          </Link>
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
            <a className="nav-link d-none d-md-block">
              <span className="bi bi-collection-play"></span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link d-none d-md-block">
              <span className="bi bi-shop"></span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link d-none d-md-block">
              <span className="bi bi-people"></span>
            </a>
          </li>
          <li
            className="nav-item d-sm-none rounded-pill border bg-light me-2 px-lg-0 px-xl-2 dropdown"
            style={{ height: "40px", width: "40px" }}
          >
            <a
              className="nav-link p-0 d-flex justify-content-center align-items-center position-relative h-100 w-100"
              role="button"
              id="notificationdrop"
              data-bs-toggle="offcanvas"
              data-bs-target="#notificationcanvas"
              aria-controls="notificationcanvas"
              onClick={() => {
                if(needTofetch){
                  fetchNotification();
                  setNeedTofetch(false)
                }
                if(n_count > 0){
                  makeRead();
                  setN_count(0)
                }
              }}
              style={{ fontSize: "1rem" }}
            >
              <span className="bi bi-bell p-0"></span>
              {n_count !== 0 && (
                <span
                  className="position-absolute p-1 rounded-pill bg-danger text-center text-white d-flex justify-content-center align-items-center"
                  style={{
                    height: "20px",
                    width: "20px",
                    top: "-5px",
                    right: "-6px",
                  }}
                >
                  {n_count}
                </span>
              )}
            </a>
            <NotificationOffcanvas notification={notification} user={user} />
          </li>
        </ul>

        {/* mobile off canvas  */}

        <button
          className="btn resetbtn navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNav"
          aria-controls="offcanvasNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <MobileNav currentUser={user} logout={logout} />

        {/* right side navbar  */}

        <div className="d-none d-sm-block" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-lg-0 justify-content-end">
            <li className="nav-item navuname d-none d-xl-flex p-3 bg-light border border-primary me-1 rounded-pill">
              <Link
                className="nav-link "
                passHref
                href={`/profile/${user._id}`}
              >
                <a style={{ textDecoration: "none" }}>
                  {user.profile && (
                    <img
                      src={user.profile.profileImage}
                      className="d-inline rounded-pill"
                      height="35px"
                      width="35px"
                      alt={`${user?.name?.firstName} ${user?.name?.lastName}`}
                      style={{ objectFit: "cover" }}
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
              <a className="nav-link">
                <span className="bi bi-messenger"></span>
              </a>
            </li>
            <li className="nav-item rounded-pill d-none d-sm-block border bg-light me-2 px-lg-0 px-xl-2 dropdown">
              <a
                className="nav-link position-relative rounded-pill h-100 d-flex justify-content-center align-items-center p-0"
                role="button"
                id="notificationdrop"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onClick={() => {
                  fetchNotification();
                  if(n_count > 0){
                    makeRead();
                    setN_count(0)
                  }
                }}
              >
                <span className="bi bi-bell p-0"></span>
                {n_count !== 0 && (
                  <span
                    className="position-absolute p-1 rounded-pill bg-danger text-center text-white d-flex justify-content-center align-items-center"
                    style={{
                      height: "25px",
                      width: "25px",
                      top: "-5px",
                      right: "-10px",
                    }}
                  >
                    {n_count}
                  </span>
                )}
              </a>
              <NotificationDropDown
                notification={notification}
                user={user}
                mobile={false}
              />
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
                  <Link href={`/profile/${user._id}`} passHref>
                    <a className="row p-3 w-100">
                      <div className="col-3">
                        <img
                          src={user.profile?.profileImage}
                          className="rounded-pill mt-1"
                          height="56px"
                          width="56px"
                          alt={`${user?.name?.firstName} ${user?.name?.lastName}`}
                          style={{ objectFit: "cover" }}
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
                  <a className="row w-100 text-dark ps-1">
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
                  <a onClick={logout} className="row w-100 text-dark ps-1">
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
                      <a className="px-2">Privacy</a>.
                      <a className="px-2">Terms</a>.
                      <a className="px-2">Advertising</a>.
                      <a className="px-2">Ad Choices</a>.
                      <a className="px-2">Cookies</a>.
                      <a className="px-2">More</a>. @lifebook 2021
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
