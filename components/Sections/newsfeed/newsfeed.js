import React, { useEffect, useRef, useState } from "react";
import GetPosts from "./GetPosts";
import CreatePostModal from "../../Modals/CreatePostModal";
import { useApi } from "../../globalcontext/callApi";
import Slider from "react-slick";
import Link from "next/link";
import API from "../../API/API";

const NewsFeed = ({ user }) => {
  const confirmReqBtn = useRef();
  const rejectReqBtn = useRef();

  const { data, isLoading, isError } = useApi({
    text: "posts",
    method: "GET",
    url: "/posts",
    revalidate: {
      revalidateIfStale: true,
      revalidateOnFocus: true,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
      refreshWhenOffline: true,
      refreshInterval: 500,
    },
  });
  const peoples = useApi({
    text: "people",
    method: "GET",
    url: `/people/${user._id}`,
  });

  const friendRequest = async (receiver_id) => {
    await API.put(
      `/sentrequest/${receiver_id}`,
      {
        sender_id: user._id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const confirmRequest = async (id) => {
    await API.put(
      `/confirmrequest/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const rejectRequest = async (id) => {
    await API.put(
      `/rejectrequest/${id}`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const PrevButton = (props) => {
    const { onClick } = props;
    return (
      <button
        className="slick-arrow d-none d-md-block testimonial-control-prev shadow border"
        type="button"
        onClick={onClick}
      >
        <span className="bi bi-chevron-left text-primary" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
    );
  };
  const NextButton = (props) => {
    const { onClick } = props;
    return (
      <button
        className="btn slick-arrow  d-none d-md-block testimonial-control-next shadow border"
        type="button"
        onClick={onClick}
      >
        <span className="bi bi-chevron-right text-primary" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    );
  };

  if (isLoading) {
    return (
      <section className="feed-container">
        <div className="row feedrow gy-2 gy-sm-4 px-0 px-sm-3 ps-lg-5">
          {/* create post column  */}

          <div className="col-12 bg-white custom-rounded p-0 p-sm-2 mt-3 mt-sm-5 border">
            <div className="row gy-3 gy-sm-3 p-0 pt-3 w-100 m-0 justify-content-center align-items-center p-sm-3">
              <div className="col-12 d-flex align-items-center justify-content-center p-0">
                <div
                  className="d-flex justify-content-evenly align-items-center"
                  style={{ width: "85%" }}
                >
                  {user.profile && (
                    <img
                      src={user.profile.profileImage}
                      className="postimg rounded-pill"
                      alt={`${user?.name?.firstName} ${user?.name?.lastName}`}
                    />
                  )}
                  <div className="bg-light statuscol border overflow-hidden">
                    <form action="" className="h-100">
                      <input
                        type="text"
                        data-bs-toggle="modal"
                        data-bs-target="#createpost"
                        placeholder={`What's on your mind, ${user.name?.firstName}?`}
                        className="form-control statusinp bg-light"
                        disabled
                      />
                    </form>
                  </div>
                </div>
              </div>

              <hr className="mb-1 w-75 w-sm-100" />
              <div className="col-12 p-0">
                <div className="d-flex justify-content-evenly align-items-center pb-3">
                  <div className="mx-2 postbottom ">
                    <span className="bi bi-camera-reels-fill text-danger pe-2"></span>{" "}
                    Live Video
                  </div>
                  <div className="mx-2 postbottom ">
                    <span className="bi bi-images text-success pe-2"></span>{" "}
                    Photo / Video
                  </div>
                  <div className="mx-2 postbottom ">
                    <span className="bi bi-emoji-smile text-warning pe-2"></span>{" "}
                    Feeling activity
                  </div>
                </div>
              </div>
              {/* Create post Modal */}
              <CreatePostModal user={user} />
            </div>
          </div>

          <div className="col-12 border shadow-sm bg-white custom-rounded p-2">
            <div className="d-flex justify-content-start">
              <div className="placeholder-glow w-100 mt-3">
                <div className="col-12 col-sm-8 d-flex justify-content-start px-sm-4">
                  <div className="col-3 ps-2">
                    <span
                      className="placeholder rounded-pill"
                      style={{ width: "45px", height: "45px" }}
                    ></span>
                  </div>
                  <div className="col-5">
                    <span className="placeholder col-12"></span>
                    <span className="placeholder col-8"></span>
                  </div>
                </div>
                <div className="col-12 px-4 my-3">
                  <span className="placeholder col-6 mt-2 px-2 me-3"></span>
                  <span className="placeholder col-5 mt-2"></span>
                  <span className="placeholder col-12 mt-2"></span>
                  <span className="placeholder col-3 mt-2 me-2"></span>
                  <span className="placeholder col-3 mt-2 me-2"></span>
                  <span className="placeholder col-3 mt-2"></span>
                  <span className="placeholder col-6 mt-2 px-2 me-3"></span>
                  <span className="placeholder col-5 mt-2"></span>
                  <span className="placeholder col-12 mt-2"></span>
                  <span className="placeholder col-3 mt-2 me-2"></span>
                  <span className="placeholder col-3 mt-2 me-2"></span>
                  <span className="placeholder col-3 mt-2"></span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 border shadow-sm bg-white custom-rounded p-2">
            <div className="d-flex justify-content-start">
              <div className="placeholder-glow w-100 mt-3">
                <div className="col-12 col-sm-8 d-flex justify-content-start px-sm-4">
                  <div className="col-3 ps-2">
                    <span
                      className="placeholder rounded-pill"
                      style={{ width: "45px", height: "45px" }}
                    ></span>
                  </div>
                  <div className="col-5">
                    <span className="placeholder col-12"></span>
                    <span className="placeholder col-8"></span>
                  </div>
                </div>
                <div className="col-12 px-4 my-3">
                  <span className="placeholder col-6 mt-2 px-2 me-3"></span>
                  <span className="placeholder col-5 mt-2"></span>
                  <span className="placeholder col-12 mt-2"></span>
                  <span className="placeholder col-3 mt-2 me-2"></span>
                  <span className="placeholder col-3 mt-2 me-2"></span>
                  <span className="placeholder col-3 mt-2"></span>
                  <span className="placeholder col-6 mt-2 px-2 me-3"></span>
                  <span className="placeholder col-5 mt-2"></span>
                  <span className="placeholder col-12 mt-2"></span>
                  <span className="placeholder col-3 mt-2 me-2"></span>
                  <span className="placeholder col-3 mt-2 me-2"></span>
                  <span className="placeholder col-3 mt-2"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (isError) {
    return (
      <section className="feed-container">
        <div className="row feedrow gy-2 gy-sm-4 px-0 px-sm-3 ps-lg-5">
          <div className="col-12 bg-white custom-rounded p-0 p-sm-2 mt-3 mt-sm-5 border">
            <div className="row gy-3 gy-sm-3 p-0 pt-3 w-100 m-0 justify-content-center align-items-center p-sm-3">
              <div className="col-12 d-flex align-items-center justify-content-center p-0">
                <div
                  className="d-flex justify-content-evenly align-items-center"
                  style={{ width: "85%" }}
                >
                  {user.profile && (
                    <img
                      src={user.profile.profileImage}
                      className="postimg rounded-pill"
                      alt={`${user?.name?.firstName} ${user?.name?.lastName}`}
                    />
                  )}
                  <div className="bg-light statuscol border overflow-hidden">
                    <form action="" className="h-100">
                      <input
                        type="text"
                        data-bs-toggle="modal"
                        data-bs-target="#createpost"
                        placeholder={`What's on your mind, ${user.name?.firstName}?`}
                        className="form-control statusinp bg-light"
                        disabled
                      />
                    </form>
                  </div>
                </div>
              </div>

              <hr className="mb-1 w-75 w-sm-100" />
              <div className="col-12 p-0">
                <div className="d-flex justify-content-evenly align-items-center pb-3">
                  <div className="mx-2 postbottom ">
                    <span className="bi bi-camera-reels-fill text-danger pe-2"></span>{" "}
                    Live Video
                  </div>
                  <div className="mx-2 postbottom ">
                    <span className="bi bi-images text-success pe-2"></span>{" "}
                    Photo / Video
                  </div>
                  <div className="mx-2 postbottom ">
                    <span className="bi bi-emoji-smile text-warning pe-2"></span>{" "}
                    Feeling activity
                  </div>
                </div>
              </div>
              {/* Create post Modal */}
              <CreatePostModal user={user} />
            </div>
          </div>

          <div className="col-12 bg-white border rounded p-2">
            <div className="">
              <div className="text-center">
                <h4 className="text-center">No more posts</h4>
                <p className="px-1 text-center">
                  Add more friends to see more posts in your News Feed.
                </p>
                <button className="btn btn-primary">Add friend</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="feed-container flex-column pb-3">
      {/* people may know column  */}

      {peoples.data?.length > 3 && (
        <div className="col-12 bg-white p-0 mt-3 px-2 px-sm-3">
          <div className="w-100 bg-white">
            <h5 className="p-2 text-muted">Pepole You May Know</h5>
          </div>
          <div className="w-100 my-2 px-sm-3">
            <Slider
              infinite={false}
              nextArrow={<NextButton />}
              prevArrow={<PrevButton />}
              slidesToShow={4}
              slidesToScroll={2}
              responsive={[
                {
                  breakpoint: 1200,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 2,
                    infinite: true,
                  },
                },
                {
                  breakpoint: 992,
                  settings: {
                    slidesToScroll: 1,
                    slidesToShow: 3,
                  },
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToScroll: 1,
                    slidesToShow: 3,
                  },
                },
                {
                  breakpoint: 576,
                  settings: {
                    slidesToScroll: 2,
                    slidesToShow: 2,
                  },
                },
                {
                  breakpoint: 405,
                  settings: {
                    slidesToScroll: 1,
                    slidesToShow: 2,
                  },
                },
              ]}
            >
              {peoples.data.map((people, index) => (
                <div className="p-1" key={index}>
                  <div className=" bg-white custom-rounded border shadow-sm">
                    <img
                      src={people.profile.profileImage}
                      style={{
                        height: "185px",
                        width: "100%",
                        objectFit: "cover",
                        borderTopLeftRadius: "15px",
                        borderTopRightRadius: "15px",
                      }}
                    />
                    <div className="p-2">
                      <Link passHref href={`/profile/${people._id}`}>
                        <a
                          className="text-dark"
                          style={{ textDecoration: "none" }}
                        >
                          <h6 className="d-flex justify-content-start align-items-center"
                          >{`${people.name.firstName} ${people.name.lastName}`}
                  {people.verified === true && <span className="bi bi-check rounded-pill d-inline-flex ms-2 justify-content-center align-items-center p-2 text-white bg-primary" style={{height: "15px", width: "15px"}}></span>}
                          
                          </h6>
                        </a>
                      </Link>
                      {user.friend_requests?.sent?.includes(people._id) && (
                        <div className="w-100 d-flex justify-content-between">
                          <button
                            className="btn btn-sm btn-primary bi bi-person-plus mb-2"
                            disabled
                          >
                            {" "}
                            Request sent
                          </button>
                        </div>
                      )}
                      {user.friend_requests?.received?.includes(people._id) && (
                        <div className="w-100 d-flex flex-column">
                          <button
                            className="btn btn-sm btn-primary bi bi-check mb-2"
                            ref={confirmReqBtn}
                            onClick={(e) => {
                              e.target.innerText = "Confirmed";
                              e.target.setAttribute("disabled", "true");
                              rejectReqBtn.current.setAttribute(
                                "disabled",
                                "true"
                              );
                              confirmRequest(people._id);
                            }}
                          >
                            {" "}
                            Confirm
                          </button>
                          <button
                            className="btn btn-sm btn-danger bi bi-x mb-2"
                            ref={rejectReqBtn}
                            onClick={(e) => {
                              confirmReqBtn.current.setAttribute(
                                "disabled",
                                "true"
                              );
                              e.target.innerText = " Rejected";
                              rejectRequest(people._id);
                            }}
                          >
                            {` Reject`}
                          </button>
                        </div>
                      )}
                      {!user.friend_requests?.sent?.includes(people._id) &&
                        !user.friend_requests?.received?.includes(
                          people._id
                        ) && (
                          <div className="w-100 d-flex flex-column">
                            <button
                              className="btn btn-sm btn-outline-primary bi bi-person-plus mb-2"
                              onClick={(e) => {
                                e.target.classList.remove("bi-person-plus");
                                e.target.classList.add("bi-person-check");
                                e.target.innerText = " Request Sent";
                                e.target.setAttribute("disabled", "true");
                                friendRequest(people._id);
                              }}
                            >
                              {" "}
                              Add Friend
                            </button>
                          </div>
                        )}
                     
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
      <div className="row feedrow gy-2 gy-sm-3 px-0 px-sm-3 ps-lg-5">
        {/* create post column  */}

        <div className="col-12 bg-white custom-rounded p-0 p-sm-2 mt-3 mt-sm-5 border">
          <div className="row gy-3 gy-sm-3 p-0 pt-3 w-100 m-0 justify-content-center align-items-center p-sm-3">
            <div className="col-12 d-flex align-items-center justify-content-center p-0">
              <div
                className="d-flex justify-content-evenly align-items-center"
                style={{ width: "85%" }}
              >
                {user.profile && (
                  <img
                    src={user.profile.profileImage}
                    className="postimg rounded-pill"
                    alt={`${user?.name?.firstName} ${user?.name?.lastName}`}
                  />
                )}
                <div className="bg-light statuscol border overflow-hidden">
                  <form action="" className="h-100">
                    <input
                      type="text"
                      data-bs-toggle="modal"
                      data-bs-target="#createpost"
                      placeholder={`What's on your mind, ${user.name?.firstName}?`}
                      className="form-control statusinp bg-light"
                      disabled
                    />
                  </form>
                </div>
              </div>
            </div>

            <hr className="mb-1 w-75 w-sm-100" />
            <div className="col-12 p-0">
              <div className="d-flex justify-content-evenly align-items-center pb-3">
                <div className="mx-2 postbottom ">
                  <span className="bi bi-camera-reels-fill text-danger pe-2"></span>{" "}
                  Live Video
                </div>
                <div className="mx-2 postbottom ">
                  <span className="bi bi-images text-success pe-2"></span> Photo
                  / Video
                </div>
                <div className="mx-2 postbottom ">
                  <span className="bi bi-emoji-smile text-warning pe-2"></span>{" "}
                  Feeling activity
                </div>
              </div>
            </div>
            {/* Create post Modal */}
            <CreatePostModal user={user} />
          </div>
        </div>
        {data.Posts?.length === 0 && (
          <div className="col-12 bg-white border rounded p-2">
            <div className="">
              <div className="text-center">
                <h4 className="text-center">No more posts</h4>
                <p className="px-1 text-center">
                  Add more friends to see more posts in your News Feed.
                </p>
                <button className="btn btn-primary">Add friend</button>
              </div>
            </div>
          </div>
        )}
        {data.Posts?.length > 0 &&
          data.Posts.map((post, index) => (
            <GetPosts post={post} user={user} key={index} />
          ))}
      </div>
    </section>
  );
};

export default NewsFeed;
