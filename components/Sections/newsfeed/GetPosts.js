import React, { useContext, useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import Link from "next/link";
import API from "../../API/API";
import ShowMoreText from "react-show-more-text";
import LikeShowModal from "../../Modals/LikeShowModal";
import CommentShowModal from "../../Modals/CommentShowModal";
import { useRouter } from "next/router";
import DeletePostModal from "../../Modals/DeletePostModal";

const GetPosts = ({ post, user }) => {
  const [userImage, setUserImage] = useState(null);
  const [likeText, setLikeText] = useState(post.reactions?.likes?.length);
  const [fetchLike, setFetchLike] = useState(false);
  const [fetchComment, setFetchComment] = useState(false);
  const [likebtnclass, setLikebtnclass] = useState(
    post.reactions.likes.includes(user._id)
      ? "btn bi bi-hand-thumbs-up-fill text-primary resetbtn ps-1"
      : "btn bi bi-hand-thumbs-up text-muted resetbtn ps-1"
  );
  const likeCount = useRef();
  const history = useRouter();
  const getUserImage = async () => {
    const res = await API.get(`/userimage/${post.author_id}`, {
      headers: { "Content-Type": "application/json" },
    });
    setUserImage(res.data?.profile?.profileImage);
  };
  useEffect(() => {
    setLikeText(post.reactions?.likes?.length);
    getUserImage();
  }, [post]);

  const likePost = async (e) => {
    try {
      const option = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await API.put(
        "/likepost",
        {
          user_id: user._id,
          user_username: user.username,
          post_id: e.target.dataset.postId,
        },
        option
      );
    } catch (error) {
      console.log(error);
    }
  };

  const unlikePost = async (e) => {
    try {
      const option = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await API.put(
        "/unlikepost",
        {
          user_id: user._id,
          user_username: user.username,
          post_id: e.target.dataset.postId,
        },
        option
      );
    } catch (error) {
      console.log(error.response);
    }
  };

  const hidePost = (e) => {
    const post = document.getElementById(e.target.dataset.postId);
    post.style.display = "none";
  };

  const deletePost = async (e) => {
    try {
      const option = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await API.delete(`/deletepost/${e.target.dataset.postId}`, option);
      history.reload();
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div
      className="col-12 bg-white border custom-rounded shadow-sm p-2"
      key={post._id}
      id={post._id}
      style={{height: "fit-content"}}
    >
      <div className="">
        <div className="d-flex justify-content-between py-1 px-1 px-sm-3 overflow-visible">
          <div className="d-flex justify-content-between">
            {userImage && (
              <img
                src={userImage}
                className="rounded-pill statusimg me-2"
                alt={`${post.author_name.firstName} ${post.author_name.lastName}`}
              />
            )}
            {!userImage && (
              <span
                className="placeholder rounded-pill me-2"
                style={{ width: "45px", height: "45px" }}
              ></span>
            )}
            <div className=" text-start">
              <Link passHref href={`/profile/${post.author_id}`}>
                <a
                  className="mt-1 text-dark"
                  style={{ textDecoration: "none" }}
                >{`${post.author_name.firstName} ${post.author_name.lastName}`}</a>
              </Link>
              <p className="text-muted text-start">
                <Moment fromNow interval={1000}>
                  {post.created}
                </Moment>
              </p>
            </div>
          </div>
          <div className="dropdown">
            <a
              className="btn resetbtn"
              style={{ padding: "0", height: "24px" }}
              role="button"
              id={`${post._id}drop`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="bi bi-three-dots"></span>
            </a>
            <ul
              className="dropdown-menu status-drop-down col-12"
              aria-labelledby={`${post._id}drop`}
            >
              <li className="py-2 px-3">
                <a className="row w-100 text-dark m-0">
                  <div className="col-3 p-0 pe-2">
                    <div className="icon-drop-down rounded-pill bg-light">
                      <span className="bi bi-bookmark ps-2"></span>
                    </div>
                  </div>
                  <div className="col-9">
                    <h6 className="text-dark m-0">Save Post</h6>
                    <small className="text-muted">
                      Add this to your saved item.
                    </small>
                  </div>
                </a>
              </li>
              <li className="py-2 px-3">
                <a
                  data-post-id={post._id}
                  onClick={(e) => hidePost(e)}
                  className="row w-100 text-dark m-0"
                >
                  <div
                    className="col-3 p-0 pe-2"
                    style={{ pointerEvents: "none" }}
                  >
                    <div className="icon-drop-down rounded-pill bg-light">
                      <span className="bi bi-x-lg ps-2"></span>
                    </div>
                  </div>
                  <div className="col-9" style={{ pointerEvents: "none" }}>
                    <h6 className="text-dark">Hide Post</h6>
                    <small className="text-muted">See fewer like this</small>
                  </div>
                </a>
              </li>
              <hr />
              <li className="py-2 px-3">
                <a className="row w-100 text-dark m-0">
                  <div className="col-3 p-0 pe-2">
                    <div className="icon-drop-down bg-light rounded-pill">
                      <span className="bi bi-bell ps-2"></span>
                    </div>
                  </div>
                  <div className="col-8 d-flex align-items-center">
                    <h6 className="text-dark">
                      Turn on notification for this post.
                    </h6>
                  </div>
                </a>
              </li>
              <li className="py-2 px-3">
                <a className="row w-100 text-dark m-0">
                  <div className="col-3 p-0 pe-2">
                    <div className="icon-drop-down bg-light rounded-pill">
                      <span className="bi bi-pencil-square ps-2"></span>
                    </div>
                  </div>
                  <div className="col-8 d-flex align-items-center">
                    <h6 className="text-dark">Edit Post</h6>
                  </div>
                </a>
              </li>
              {post.author_id === user._id && (
                <li className="py-2 px-3">
                  <a
                    data-post-id={post._id}
                    data-bs-toggle="modal"
                    data-bs-target={`#del${post._id}`}
                    className="row w-100 text-dark m-0"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="col-3 p-0 pe-2">
                      <div className="icon-drop-down bg-light rounded-pill">
                        <span className="bi bi-trash ps-2"></span>
                      </div>
                    </div>
                    <div className="col-8 d-flex align-items-center">
                      <h6 className="text-dark">Delete this post</h6>
                    </div>
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="px-3">
          {post.post?.text && (
            <ShowMoreText
              lines={10}
              more="Show more"
              less="Show less"
              className="content-css mb-2 px-2"
              anchorclassName="my-anchor-css-class"
              expanded={false}
              width={700}
              truncatedEndingComponent={"... "}
              keepNewLines={true}
            >
              {post.post.text}
            </ShowMoreText>
          )}
        </div>
        {post.post?.images?.length > 0 &&
          post.post.images.map((img) => (
            <img
              key={img}
              src={img}
              alt=""
              width="100%"
              className="px-2"
              style={{ maxHeight: "300px", objectFit: "contain" }}
            />
          ))}

        <div className="d-flex justify-content-between align-items-baseline px-3 px-sm-4 mt-3 postreactcount">
          <a
            role="button"
            ref={likeCount}
            onClick={() => setFetchLike(true)}
            data-post-id={post._id}
            data-bs-toggle="modal"
            data-bs-target={`#modal${post._id}`}
            className="text-muted bi bi-hand-thumbs-up text-primary pe-2"
            style={{ textDecoration: "none" }}
          >
            {" "}
            {likeText}
          </a>
          <div>
            <a
              role="button"
              data-post-id={post._id}
              onClick={() => setFetchComment(true)}
              data-bs-toggle="modal"
              data-bs-target={`#comment${post._id}`}
              className="text-muted"
              style={{ textDecoration: "none" }}
            >
              <span
                className="pe-1 pe-sm-2"
                style={{ pointerEvents: "none" }}
              >{`${post.reactions?.comments?.length}`}</span>
              Comment
            </a>
            <a
              href=""
              className="text-muted ms-2"
              style={{ textDecoration: "none" }}
            >
              <span className="pe-0 pe-sm-1">1k</span> shares
            </a>
          </div>
        </div>

        <hr className="mt-1 mb-2 m-sm-2" />

        <div className="d-flex justify-content-around postreact">
          <button
            id={`unlikebtn${post._id}`}
            data-post-id={post._id}
            onClick={(e) => {
              if (
                likebtnclass ===
                "btn bi bi-hand-thumbs-up text-muted resetbtn ps-1"
              ) {
                setLikebtnclass(
                  "btn bi bi-hand-thumbs-up-fill text-primary resetbtn ps-1"
                );
                setLikeText((prev) => prev + 1);
                likePost(e);
              } else {
                setLikebtnclass(
                  "btn bi bi-hand-thumbs-up text-muted resetbtn ps-1"
                );
                setLikeText((prev) => prev - 1);
                unlikePost(e);
              }
            }}
            className={likebtnclass}
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              fontFamily: "roboto",
            }}
          >
            {" "}
            Like
          </button>

          <Link href={`/posts/${post._id}`} passHref>
            <button
              data-post-id={post._id}
              className="btn text-muted resetbtn"
              style={{
                textDecoration: "none",
                fontWeight: "bold",
                fontFamily: "roboto",
              }}
            >
              <span className="bi bi-chat-left-text pe-2"></span> Comment
            </button>
          </Link>
          <button
            className="btn text-muted"
            style={{
              textDecoration: "none",
              fontWeight: "bold",
              fontFamily: "roboto",
            }}
          >
            <span className="bi bi-share pe-2"></span> Share
          </button>
        </div>
      </div>

      {/* delete post modal  */}

      <DeletePostModal post={post} deletePost={deletePost} />

      {/* modal for like  */}
      <LikeShowModal
        post={post}
        fetchLike={fetchLike}
        setFetchLike={setFetchLike}
      />

      {/* modal for comments  */}

      <CommentShowModal
        post={post}
        fetchComment={fetchComment}
        setFetchComment={setFetchComment}
        user={user}
      />
    </div>
  );
};

export default GetPosts;
