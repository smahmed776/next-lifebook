import React, { Fragment } from "react";
import Header from "../components/Header/Header";
import NewsFeed from "../components/Sections/newsfeed/newsfeed";
import RightSideBar from "../components/Sections/rightsidebar/rightsidebar";
import LeftSideBar from "../components/Sections/leftSideBar/leftsidebar";

export default function Handler(props) {
  return (
  <Fragment>
    <Header user={props.user} notificationCount={props.notification}/>
    <div
      className="row position-relative gx-0 px-2 px-md-0 gx-md-4 gx-lg-0 "
      style={{ backgroundColor: "rgb(240, 242, 245)" }}
    >
      <div className="col-xl-3 position-sticky leftcol d-none d-xl-block">
        <LeftSideBar currentUser={props.user} />
      </div>
      <div className="col-12 col-md-7 col-lg-8 col-xl-6 pb-5">
        <NewsFeed user={props.user} />
      </div>
      <div className="col-md-5 col-lg-4 col-xl-3 d-none d-md-block position-sticky rightcol">
        <RightSideBar />
      </div>
    </div>
  </Fragment>
    )
  }
