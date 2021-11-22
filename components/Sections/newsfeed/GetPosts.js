import React, { useContext, useEffect, useRef, useState } from "react";
import Moment from "react-moment";
import Link from "next/link";
import API from "../../API/API";
import { callApi } from "../../globalcontext/callApi";
import ShowMoreText from "react-show-more-text";
import LikeShowModal from "../../Modals/LikeShowModal";
import CommentShowModal from "../../Modals/CommentShowModal";

const GetPosts = ({ post, user }) => {
  const [comment, setComment] = useState("");
  const [likeText, setLikeText] = useState(post.reactions?.likes?.length);
  const [fetchLike, setFetchLike] = useState(false);
  const [fetchComment, setFetchComment] = useState(false);
  const [reqAgain, setReqAgain] = useState([]);
  const [newComment, setNewComment] = useState([]);
  const [likebtnclass, setLikebtnclass] = useState(
    post.reactions.likes.includes(user._id)
      ? "btn bi bi-hand-thumbs-up-fill text-primary resetbtn ps-1"
      : "btn bi bi-hand-thumbs-up resetbtn ps-1"
  );
  const [reqtype, setreqType] = useState("");
  const [postid, setPostid] = useState("");
  const likeCount = useRef();
  useEffect(() => {
    setLikeText(post.reactions?.likes?.length);
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

  const getLikers = (e) => {
    setReqAgain(!reqAgain);
    const postId = e.target.dataset.postId;
    setreqType("like");
    setPostid(postId);
  };

  const getComments = (id, strng) => {
    setReqAgain(!reqAgain);
    const commentId = id;
    setreqType("comment");
    setPostid(commentId);
    if (strng === "true") {
      setNewComment(!newComment);
    }
  };

  const deletePost = async (e) => {
    try {
      const option = {
        headers: {
          "Content-Type": "application/json",
          Athorization: `Bearer ${e.target.dataset.postId}`,
        },
      };

      await API.delete("/deletepost", option);

      window.location.replace("/");
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div
      className="col-12 bg-white border custom-rounded shadow-sm p-2"
      key={post._id}
      id={post._id}
    >
      <div className="">
        <div className="d-flex justify-content-between py-1 px-1 px-sm-3">
          <div className="d-flex justify-content-between">
            {post.author_image ? (
              <img
                src={post.author_image}
                className="rounded-pill statusimg me-2"
                alt={`${post.author_name.firstName} ${post.author_name.lastName}`}
              />
            ) : (
              <span
                className="bi bi-person-circle pe-3"
                style={{ fontSize: "1.5rem" }}
              ></span>
            )}
            <div className=" text-start">
              <Link passHref href={`/profile?id=${post.author_id}`}>
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
            <button
              className="btn resetbtn"
              style={{ padding: "0", height: "24px" }}
              href="#my-works"
              role="button"
              id={`${post._id}drop`}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="bi bi-three-dots"></span>
            </button>
            <ul className="dropdown-menu" aria-labelledby={`${post._id}drop`}>
              {post.author_id === user._id ? (
                <li className="dropdown-item ">
                  <button
                    className="btn text-white w-100 text-center bg-danger"
                    data-bs-toggle="modal"
                    data-bs-target={`#del${post._id}`}
                  >
                    Delete
                  </button>
                </li>
              ) : (
                <li className="dropdown-item ">
                  <button
                    className="btn text-white w-100 text-center bg-danger"
                    data-post-id={post._id}
                    onClick={(e) => hidePost(e)}
                  >
                    Hide
                  </button>
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
          {post.post?.images?.length > 0 &&
            post.post.images.map((img) => (
              <img
                key={img}
                src={img}
                alt=""
                width="100%"
                className="px-2"
                style={{ objectFit: "contain" }}
              />
            ))}
        </div>

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
              if (likebtnclass === "btn bi bi-hand-thumbs-up resetbtn ps-1") {
                setLikebtnclass(
                  "btn bi bi-hand-thumbs-up-fill text-primary resetbtn ps-1"
                );
                setLikeText((prev) => prev + 1);
                likePost(e);
              } else {
                setLikebtnclass("btn bi bi-hand-thumbs-up resetbtn ps-1");
                setLikeText((prev) => prev - 1);
                unlikePost(e);
              }
            }}
            className={likebtnclass}
            style={{ textDecoration: "none" }}
          >
            {" "}
            Like
          </button>

          <button
            onClick={() => setFetchComment(true)}
            data-post-id={post._id}
            data-bs-toggle="modal"
            data-bs-target={`#comment${post._id}`}
            className="btn text-dark"
            style={{ textDecoration: "none" }}
          >
            <span className="bi bi-chat-left-text pe-2"></span> Comment
          </button>
          <button className="btn text-dark" style={{ textDecoration: "none" }}>
            <span className="bi bi-share pe-2"></span> Share
          </button>
        </div>
      </div>

      {/* delete post modal  */}

      <div
        className="modal fade"
        id={`del${post._id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby={`del${post._id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <h3 className="modal-title">Confirmation</h3>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body px-1 ">
              <p className="ps-3">Are you sure to delete this post?</p>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-post-id={post._id}
                onClick={(e) => deletePost(e)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

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
