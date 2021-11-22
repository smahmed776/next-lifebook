import React from "react";
import Link from "next/link";

const LeftSideBar = ({ currentUser }) => {
  return (
    <section className="leftsidebar-container mt-2 position-absolute w-100">
      <ul className="d-flex flex-column w-100">
        <li className="nav-item">
          <Link
            passHref
            href={`/profile?id=${currentUser._id}`}
            className="nav-link"
          >
            <a>
              {currentUser.profile?.profileImage && (
                <img
                  src={currentUser.profile.profileImage}
                  height="35px"
                  width="35px"
                  className="me-2 rounded-pill"
                  alt={`${currentUser.name.firstName} ${currentUser.name.lastName}`}
                />
              ) }
              {`${currentUser.name.firstName} ${currentUser.name.lastName}`}
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link">
            <span className="bi bi-person-plus-fill text-primary"></span> Find
            friends
          </a>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link">
            Welcome
          </a>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link">
            <span className="bi bi-play-btn-fill text-primary"></span> Watch
          </a>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link">
            <span className="bi bi-people-fill text-primary"></span> Groups
          </a>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link">
            <span className="bi bi-shop-fill text-primary"></span>Marketplace
          </a>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link">
            <span className="bi bi-bookmark-fill text-primary"></span>Saved
          </a>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link">
            <span className="bi bi-arrow-counterclockwise text-primary"></span>
            Memories
          </a>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link">
            <span className="bi bi-flag-fill text-primary"></span>Pages
          </a>
        </li>
        <li className="nav-item">
          <a href="" className="nav-link">
            <span className="bi bi-calendar-date-fill text-primary"></span>
            Events
          </a>
        </li>
      </ul>
    </section>
  );
};

export default LeftSideBar;
