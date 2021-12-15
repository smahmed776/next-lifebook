import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import API from "../../API/API";
import GetPosts from "../newsfeed/GetPosts";
import ChangeProfilePicModal from "../../Modals/ChangeProfilePicModal";
import ChangeCoverPicModal from "../../Modals/ChangeCoverPicModal";
import CreatePostModal from "../../Modals/CreatePostModal";
import { useApi } from "../../globalcontext/callApi";
import Friends from "./Friends";
import ProfImages from "./ProfImages";

const ProfilePage = ({ user, data }) => {
  const [profilePost, setProfilePost] = useState({ isLoading: true });
  const [friends, setFriends] = useState(null);
  const confirmReqBtn = useRef();
  const rejectReqBtn = useRef();
  const fetchProfilePosts = async () => {
    try {
      setProfilePost({
        isLoading: true,
        data: "undefined",
      });
      const res = await API.get(`/posts/${data._id}`, {
        headers: { "Content-Type": "application/json" },
      });
      setProfilePost({
        isLoading: false,
        data: {
          Posts: res.data.Posts,
        },
      });
    } catch (error) {
      setProfilePost({
        isLoading: true,
        isError: true,
        data: "undefined"
      })
    }
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
  const unfriend = async (receiver_id) => {
    await API.put(
      `/unfriend/${receiver_id}`,
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

  const getFriends = async (id) => {
    const res = await API.post(`/friends/${id}`);
    setFriends(res.data);
  };

  useEffect(() => {
    getFriends(data._id);
    fetchProfilePosts();
  }, [data]);

  return (
    <div className="profile-container">
      <div className="row gy-sm-5 cover-container border-bottom bg-white w-100 m-0 p-0 ">
        <div className="col-12 profile-cover mt-0">
          <div className="border shadow-sm p-sm-1 position-relative profile-cover-img">
            <img
              src={data.profile.coverImage}
              className="rounded h-100 w-100"
              alt=""
            />
            {data._id === user._id && (
              <div
                className="position-absolute d-flex justify-content-center w-100"
                style={{ bottom: "0", zIndex: "100" }}
              >
                <div
                  className="d-flex justify-content-end px-2"
                  style={{ width: "100%" }}
                >
                  <button
                    type="button"
                    className="btn btn-secondary "
                    data-bs-toggle="modal"
                    data-bs-target="#changeCover"
                  >
                    <span className="bi bi-camera me-1"></span>
                    <span className="d-none d-sm-inline-block">
                      Change Cover
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="cover-bottom d-flex flex-column justify-content-center w-100">
            <div className="d-flex justify-content-center w-100 position-relative">
              <div className="profile-img rounded-pill bg-white">
                {data.profile.profileImage ? (
                  <img
                    src={data.profile.profileImage}
                    className="rounded-pill"
                    alt={data.name.firstName}
                  />
                ) : (
                  <span className="bi bi-person-circle"></span>
                )}
              </div>
              {data._id === user._id && (
                <div
                  className="position-absolute d-flex justify-content-end"
                  style={{ bottom: "0", width: "110px", zIndex: "100" }}
                >
                  <button
                    type="button"
                    className="btn btn-secondary bi bi-camera rounded-pill"
                    data-bs-toggle="modal"
                    data-bs-target="#changeProfile"
                  ></button>
                </div>
              )}
            </div>
            <div className="pt-2">
              <h3 className="text-center d-flex justify-content-center align-items-center" style={{fontFamily: "cursive"}}>{`${data.name.firstName} ${data.name.lastName}`}
              {data.verified === true && <span className="bi bi-check rounded-pill d-inline-flex p-2 ms-2 justify-content-center align-items-center p-2 text-white bg-primary" style={{height: "25px", width: "25px"}}></span>}
              
              </h3>
              <p className="text-muted text-center">Your Bio</p>
            </div>
          </div>
        </div>

        <div className="col-12 d-flex justify-content-center pt-5 mt-3 mt-sm-5 px-0 px-lg-5 mx-0">
          <div className="profile-nav pt-5 px-0 px-lg-5 w-100">
            <ul className="navbar border-top pt-3 px-0 px-lg-3 m-0">
              <li className="nav-item border-bottom border-primary pb-1 mt-2">
                <a href="" className="nav-link">
                  Posts
                </a>
              </li>
              <li className="nav-item mt-2">
                <a href="" className="nav-link text-dark">
                  About
                </a>
              </li>
              <li className="nav-item mt-2">
                <a href="" className="nav-link text-dark">
                  Friends{" "}
                  {data.friends.length > 0 && `(${data.friends.length})`}
                </a>
              </li>
              <li className="nav-item mt-2">
                <a href="" className="nav-link text-dark">
                  Photos
                </a>
              </li>
              {data._id === user._id && (
                <li className="nav-item px-2 mt-2">
                  <button className="btn btn-white border bi bi-pencil-square mb-2">
                    {" "}
                    Edit Profile
                  </button>
                </li>
              )}

              {data._id !== user._id && !data.friends.includes(user._id) && (
                <li className="nav-item px-2 mt-2">
                  {user.friend_requests?.sent?.includes(data._id) && (
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
                  {user.friend_requests?.received?.includes(data._id) && (
                    <>
                      <button
                        className="btn btn-sm btn-primary bi bi-check mb-2 me-2"
                        ref={confirmReqBtn}
                        onClick={(e) => {
                          e.target.innerText = "Confirmed";
                          e.target.setAttribute("disabled", "true");

                          confirmRequest(data._id);
                        }}
                      >
                        {" "}
                        Confirm
                      </button>
                      <button
                        className="btn btn-sm btn-danger bi bi-x mb-2"
                        ref={rejectReqBtn}
                        onClick={(e) => {
                          e.target.innerText = " Rejected";
                          rejectRequest(data._id);
                        }}
                      >
                        {` Reject`}
                      </button>
                    </>
                  )}
                  {!user.friend_requests?.sent?.includes(data._id) &&
                    !user.friend_requests?.received?.includes(data._id) && (
                      <div className="w-100 d-flex justify-content-between">
                        <button
                          className="btn btn-sm btn-primary bi bi-person-plus mb-2"
                          onClick={(e) => {
                            e.target.classList.remove("bi-person-plus");
                            e.target.classList.add("bi-person-check");
                            e.target.innerText = " Request Sent";
                            e.target.setAttribute("disabled", "true");
                            friendRequest(data._id);
                          }}
                        >
                          {" "}
                          Add Friend
                        </button>
                      </div>
                    )}
                </li>
              )}
              {data._id !== user._id && user.friends.includes(data._id) && (
                <li className="nav-item px-2 mt-2 dropdown">
                  <a
                    className="btn btn-light bi bi-person-check-fill mb-2"
                    role="button"
                    id="friendsdrop"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {` Friends`}
                  </a>
                  <ul
                    className="dropdown-menu w-auto p-2"
                    aria-labelledby="friendsdrop"
                  >
                    <li className="p-0">
                      <a
                        style={{ cursor: "pointer" }}
                        className="nav-link d-flex justify-content-around"
                        onClick={() => unfriend(data._id)}
                      >
                        <span className="bi bi-person-x-fill"></span>
                        <span>Unfriend</span>
                      </a>
                    </li>
                  </ul>
                </li>
              )}

              <li className="nav-item px-2 mt-2">
                <button className="btn btn-primary bi bi-messenger mb-2">
                  {` Message`}
                </button>
              </li>
              <li className="nav-item px-2 mt-2">
                <button className="btn btn-light rounded-pill bi bi-three-dots mb-2"></button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* change Cover picture modal  */}
      <ChangeCoverPicModal />

      {/* change profile picture modal  */}
      <ChangeProfilePicModal />

      {/* bottom container  */}

      <div className="bottom-container d-flex justify-content-center px-sm-5 px-md-0 py-2">
        <div className="row row-cols-1 row-cols-md-2 gy-3 gy-md-0 mt-lg-3 px-sm-3 px-md-3 bottom-row gx-5">
          <div className="col ms-0 mb-3">
            <div className="row row-cols-1 gy-3 bottom-left m-0 w-100">
              {data._id === user._id && (
                <div className="col px-3 py-3 bg-white border rounded">
                  <h3>
                    <b>Your Profile</b>
                  </h3>
                  <p className="text-muted px-2">
                    Add details to connect with more friends and help them to
                    get to know you better.
                  </p>
                  <button className="btn btn-primary w-100">
                    {" "}
                    Get Started{" "}
                  </button>
                </div>
              )}
              {data._id === user._id && (
                <div className="col p-3 bg-white border rounded">
                  <h3>
                    <b>Intro</b>
                  </h3>
                  <button className="btn btn-light w-100 mt-2 mb-3">
                    {" "}
                    Edit Details{" "}
                  </button>
                  <button className="btn btn-light w-100 mb-3">
                    {" "}
                    Add Hobbies{" "}
                  </button>
                  <button className="btn btn-light w-100 mb-3">
                    {" "}
                    Add Features{" "}
                  </button>
                </div>
              )}
              <div className="col bg-white border rounded p-3">
                <div className="d-flex justify-content-between">
                  <h5>Photos</h5>
                  <a href="#">See All</a>
                </div>
                {data && (
                  <div className="row row-cols-2 gx-3 gy-2">
                    {data.profile.allProfileImages.length > 0 && (
                      <ProfImages image={data.profile.allProfileImages[data.profile.allProfileImages.length - 1]} />
                    )}
                    {data.profile.allProfileImages.length > 1 && (
                      <ProfImages image={data.profile.allProfileImages[data.profile.allProfileImages.length - 2]} />
                    )}
                    {data.profile.allProfileImages.length > 2 && (
                      <ProfImages image={data.profile.allProfileImages[data.profile.allProfileImages.length - 3]} />
                    )}
                    {data.profile.allProfileImages.length > 3 && (
                      <ProfImages image={data.profile.allProfileImages[data.profile.allProfileImages.length - 4]} />
                    )}
                  </div>
                )}
              </div>
              <div className="col bg-white border rounded p-3">
                <div className="d-flex justify-content-between">
                  <h5>Friends {`(${data.friends.length})`}</h5>
                  <a href="#">See All</a>
                </div>

                  
                  {!friends && (
                    <div className="row row-cols-2 row-cols-sm-3 gx-3 gx-sm-2 gy-2 placeholder-glow">
                    <div className="col">
                      <span className="placeholder col-12" style={{height: "125px"}}></span>
                    </div>
                    <div className="col">
                      <span className="placeholder col-12" style={{height: "125px"}}></span>
                    </div>
                    <div className="col">
                      <span className="placeholder col-12" style={{height: "125px"}}></span>
                    </div>
                    <div className="col">
                      <span className="placeholder col-12" style={{height: "125px"}}></span>
                    </div>
                    <div className="col">
                      <span className="placeholder col-12" style={{height: "125px"}}></span>
                    </div>
                    <div className="col">
                      <span className="placeholder col-12" style={{height: "125px"}}></span>
                    </div>
                  </div>
                  )}
                <div className="row row-cols-2 row-cols-sm-3 gx-3 gx-sm-2 gy-2 placeholder-glow">
                  {friends?.length > 0 && (
                    <Friends
                      obj={{
                        id: friends[0]._id,
                        image: friends[0].image,
                        name: {
                          firstName: friends[0].name.firstName,
                          lastName: friends[0].name.lastName,
                        },
                        verified: friends[0].verified
                      }}
                    />
                  )}
                  {friends?.length > 1 && (
                    <Friends
                      obj={{
                        id: friends[1]._id,
                        image: friends[1].image,
                        name: {
                          firstName: friends[1].name.firstName,
                          lastName: friends[1].name.lastName,
                        },
                        verified: friends[1].verified
                      }}
                    />
                  )}
                  {friends?.length > 2 && (
                    <Friends
                      obj={{
                        id: friends[2]._id,
                        image: friends[2].image,
                        name: {
                          firstName: friends[2].name.firstName,
                          lastName: friends[2].name.lastName,
                        },
                        verified: friends[2].verified
                      }}
                    />
                  )}
                  {friends?.length > 3 && (
                    <Friends
                      obj={{
                        id: friends[3]._id,
                        image: friends[3].image,
                        name: {
                          firstName: friends[3].name.firstName,
                          lastName: friends[3].name.lastName,
                        },
                        verified: friends[3].verified
                      }}
                    />
                  )}
                  {friends?.length > 4 && (
                    <Friends
                      obj={{
                        id: friends[4]._id,
                        image: friends[4].image,
                        name: {
                          firstName: friends[4].name.firstName,
                          lastName: friends[4].name.lastName,
                        },
                        verified: friends[4].verified
                      }}
                    />
                  )}
                  {friends?.length > 5 && (
                    <Friends
                      obj={{
                        id: friends[5]._id,
                        image: friends[5].image,
                        name: {
                          firstName: friends[5].name.firstName,
                          lastName: friends[5].name.lastName,
                        },
                        verified: friends[5].verified
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* post column  */}

          <div className="col row m-0 gy-3 gx-0">
            <div className="col-12 bg-white custom-rounded p-0 p-sm-2 mt-0 border">
              <div className="row gy-3 gy-sm-3 p-0 pt-3 w-100 m-0 justify-content-center align-items-center p-sm-3">
                <div className="col-12 d-flex align-items-center justify-content-center p-0">
                  <div
                    className="d-flex justify-content-evenly align-items-center"
                    style={{ width: "85%" }}
                  >
                    {data.profile && (
                      <img
                        src={data.profile.profileImage}
                        className="postimg rounded-pill"
                        alt={`${data?.name?.firstName} ${data?.name?.lastName}`}
                      />
                    )}
                    <div className="bg-light statuscol border overflow-hidden">
                      <form action="" className="h-100">
                        <input
                          type="text"
                          data-bs-toggle="modal"
                          data-bs-target="#createpost"
                          placeholder={
                            data._id === user._id
                              ? `What's on your mind, ${user.name?.firstName}?`
                              : `Post on ${data.name?.firstName}'s timeline..?`
                          }
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

            {profilePost.isLoading && (
              <div className="col-12 border shadow-sm bg-white custom-rounded p-2 my-2">
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
            )}

            {profilePost.data?.Posts?.length > 0 &&
              profilePost.data.Posts.map((post, index) => (
                <GetPosts post={post} user={user} key={index} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
