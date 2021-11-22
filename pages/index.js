import { Fragment } from "react";
import Header from "../components/Header/Header";
import { useApi } from "../components/globalcontext/callApi";
import HomePage from "../components/HomePage/HomePage";
import NewsFeed from "../components/Sections/newsfeed/newsfeed"
import RightSideBar from "../components/Sections/rightsidebar/rightsidebar"
import LeftSideBar from "../components/Sections/leftSideBar/leftsidebar"


export default function Home() {
  const { data, isLoading, isError } = useApi({
    text: "user",
    method: "GET",
    url: "/user"
  });
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 vw-100 bg-white" >
        <button className="spinner spinner-border bg-white"></button>
      </div>
    );
  }
  if (isError) {
    return (<HomePage />);
  }
  return (
    <Fragment>
      <Header user={data.findUser} />
      <div className="row position-relative gx-0 px-2 px-md-0 gx-md-4 gx-lg-0 " style={{backgroundColor: "rgb(240, 242, 245)"}}>
        <div className="col-xl-3 position-sticky leftcol d-none d-xl-block">
          <LeftSideBar currentUser={data.findUser} />
        </div>
        <div className="col-12 col-md-7 col-lg-8 col-xl-6">
          <NewsFeed user={data.findUser} />
        </div>
        <div className="col-md-5 col-lg-4 col-xl-3 d-none d-md-block position-sticky rightcol">
          <RightSideBar />
        </div>
      </div>
    </Fragment>
  );
}
