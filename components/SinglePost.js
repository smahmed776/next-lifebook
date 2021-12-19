import React, { useContext, useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import ReactPlayer from "react-player";
import Link from "next/link";
import API from "./API/API";
import ShowMoreText from "react-show-more-text";
import LikeShowModal from "./Modals/LikeShowModal";
import CommentShowModal from "./Modals/CommentShowModal";
import { useRouter } from "next/router";
import DeletePostModal from "./Modals/DeletePostModal";

const SinglePost = ({ post, user, postComments }) => {
  const [userImage, setUserImage] = useState(null);
  const [verified, setVerified] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(null);
  const [likeText, setLikeText] = useState(post.reactions?.likes?.length);
  const [fetchLike, setFetchLike] = useState(false);
  const [fetchComment, setFetchComment] = useState(false);
  const [likebtnclass, setLikebtnclass] = useState(
    post.reactions.likes.includes(user._id)
      ? "btn bi bi-hand-thumbs-up-fill text-primary resetbtn ps-1"
      : "btn bi bi-hand-thumbs-up text-muted resetbtn ps-1"
  );
  const commentbtn = useRef();
  const commentSpinner = useRef();
  const likeCount = useRef();
  const history = useRouter();
  const getUserImage = async () => {
    const res = await API.get(`/userimage/${post.author_id}`, {
      headers: { "Content-Type": "application/json" },
    });
    setUserImage(res.data?.profile?.profileImage);
    setVerified(res.data?.verified);
  };

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

  const makeComment = async (e) => {
    e.preventDefault();
    if (newComment === "") {
      return;
    }
    try {
      commentbtn.current.setAttribute("disabled", "true");
      commentSpinner.current.classList.remove("d-none");
      const body = {
        text: newComment,
        c_id: user._id,
        post_id: post._id,
        image: null,
      };
      await API.put("/comment", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      commentbtn.current.removeAttribute("disabled");
      commentSpinner.current.classList.add("d-none");
      setFetchComment(true);
      setNewComment("");
    } catch (error) {
      commentbtn.current.removeAttribute("disabled");
      commentSpinner.current.classList.add("d-none");
      console.log(error.response, error);
    }
  };

  async function getComments(post_id) {
    setComments(null);
    const res = await API.get(`/comments/${post_id}`, {
      headers: { "Content-Type": "application/json" },
    });
    setComments(res.data);
  }

  useEffect(() => {
    setComments(postComments);
  }, [postComments]);
  useEffect(() => {
    if (fetchComment) {
      getComments(post._id);
      setFetchComment((prev) => !prev);
    }
  }, [fetchComment]);
  useEffect(() => {
    setLikeText(post.reactions?.likes?.length);
    getUserImage();
  }, [post]);

  return (
    <div className="col-12 bg-white border p-2" key={post._id} id={post._id}>
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
                  className="mt-1 text-dark d-flex justify-content-start align-items-center"
                  style={{ textDecoration: "none" }}
                >
                  {`${post.author_name.firstName} ${post.author_name.lastName}`}
                  {verified === true && (
                    <span
                      className="bi bi-check rounded-pill ms-2 d-inline-flex justify-content-center align-items-center p-2 text-white bg-primary"
                      style={{ height: "15px", width: "15px" }}
                    ></span>
                  )}
                </a>
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
              {/* <li className="py-2 px-3">
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
              </li> */}
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
        <div className="px-3 px-lg-5">
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
        {post.post?.video && (
          <ReactPlayer url={post.post.video} controls={true} height={"350px"} width={"100%"} />
        )}

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
              className="text-muted"
              style={{ textDecoration: "none" }}
            >
              <span className="pe-1 pe-sm-2" style={{ pointerEvents: "none" }}>
                {comments && comments.length}
              </span>
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

        <hr className="my-1 mt-sm-2 mb-sm-1 mx-sm-2" />

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
        <hr className="mt-1 mb-2 m-sm-2" />

        <div className="modal-body px-1 ">
          {!comments && (
            <div className="row w-100 m-0 mb-3 placeholder-glow">
              <div className="col-2 p-0 d-flex justify-content-end">
                <span
                  className="placeholder text-dark col-12 me-2 rounded-pill"
                  style={{ height: "45px", width: "45px" }}
                ></span>
              </div>
              <div className="col-6 rounded">
                <a
                  className="text-dark"
                  style={{ textDecoration: "none", fontWeight: "bold" }}
                >
                  <span className="placeholder text-dark col-10 me-2"></span>
                  <span className="placeholder text-dark col-6 me-2 my-2"></span>
                </a>
              </div>
              <div className="col-3 "></div>
              <div className="col-2 px-0"></div>
              <div className="col-10">
                <span className="placeholder text-dark col-12 me-2"></span>
                <span className="placeholder text-dark col-4 me-2"></span>
                <span className="placeholder text-dark col-7 me-2 my-2"></span>
                <span className="placeholder text-dark col-6 me-2"></span>
                <span className="placeholder text-dark col-5 me-2 my-2"></span>
                <span className="placeholder text-dark col-4 me-2"></span>
                <span className="placeholder text-dark col-7 me-2 my-2"></span>
              </div>
            </div>
          )}

          {comments &&
            comments.length > 0 &&
            comments.map((i, index) => (
              <div className="row w-100 m-0 mb-3" key={index}>
                <div className="col-2 p-0 d-flex justify-content-center">
                  <img
                    src={i.image}
                    alt=""
                    className="rounded-pill"
                    style={{
                      height: "45px",
                      width: "45px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-10 bg-light rounded py-1 ps-3">
                  <Link
                    role="button"
                    href={`/profile/${i.c_id}`}
                    passHref
                    target="_blank"
                    className="text-dark"
                  >
                    <a
                      className="text-dark"
                      style={{
                        textDecoration: "none",
                        fontWeight: "700",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {`${i.name.firstName} ${i.name.lastName}`}
                      {i.verified === true && (
                    <span
                      className="bi bi-check rounded-pill ms-2 d-inline-flex justify-content-center align-items-center p-2 text-white bg-primary"
                      style={{ height: "15px", width: "15px" }}
                    ></span>
                  )}
                    </a>
                  </Link>
                  <p>{i.text}</p>
                </div>
                <div className="col-12 col-sm-10 ms-0 ms-sm-5 ps-0 ps-sm-3 pe-0 d-flex justify-content-around align-items-center">
                  {i.c_id === user._id && (
                    <button className="btn resetbtn text-primary">
                      Delete
                    </button>
                  )}
                  <button className="btn resetbtn text-primary">Like</button>
                  <button className="btn resetbtn text-primary">Reply</button>
                  <p className="text-muted text-end m-0">
                    <Moment fromNow interval={1000}>
                      {i.created}
                    </Moment>
                  </p>
                </div>
              </div>
            ))}
        </div>
        <form
          className="w-100"
          onSubmit={(e) => makeComment(e)}
          data-post-id={post._id}
        >
          <div className="d-flex justify-content-center w-100 m-0">
            <div className="col-6 col-sm-8 p-0 pe-2 ">
              <input
                type="text"
                placeholder="write a comment..."
                className="form-control"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
            <div className="col-6 col-sm-4 p-0">
              <button
                type="submit"
                className="btn btn-md btn-primary "
                ref={commentbtn}
              >
                <span
                  className="spinner-border spinner-border-sm me-2 d-none"
                  ref={commentSpinner}
                ></span>
                Comment
              </button>
            </div>
          </div>
        </form>
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

export default SinglePost;
