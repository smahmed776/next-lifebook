import React, { useEffect, useRef, useState } from "react";
import API from "../API/API";
import Link from "next/link";
import Moment from "react-moment";

const CommentShowModal = ({ post, fetchComment, setFetchComment, user }) => {
  const [comment, setComment] = useState([]);
  const [comments, setComments] = useState([]);
  const [data, setData] = useState(null);
  const [postId, setPostId] = useState(post._id);
  const commentSpinner = useRef();
  const commentbtn = useRef();

  const makeComment = async (e) => {
    e.preventDefault();
    try {
      commentbtn.current.setAttribute("disabled", "true");
      commentSpinner.current.classList.remove("d-none");
      const body = {
        text: comment,
        c_id: user._id,
        post_id: post._id,
        image: null,
      };
      await API.put("/comment", body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setComment("");
      commentbtn.current.removeAttribute("disabled");
      commentSpinner.current.classList.add("d-none");
      setFetchComment(true);
    } catch (error) {
      commentbtn.current.removeAttribute("disabled");
      commentSpinner.current.classList.add("d-none");
      console.log(error.response, error);
    }
  };

  async function getComments(post_id) {
    setData(null);
    const res = await API.get(`/comments/${post_id}`, {
      headers: { "Content-Type": "application/json" },
    });
    setData(res.data);
  }

  useEffect(() => {
    if (fetchComment) {
      getComments(postId);
      setFetchComment((prev) => !prev);
    }
  }, [fetchComment]);
  if (!data) {
    return (
      <div
        className="modal fade"
        id={`comment${post._id}`}
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby={`comment${post._id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <h3 className="modal-title text-primary">
                  <span className="bi bi-chat-fill text-primaty me-2"></span>
                  {post.reactions?.comments?.length}
                </h3>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={() => setComments([])}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body px-3 ">
              <div className="row w-100 m-0 mb-3 placeholder-glow">
                <div className="col-2 p-0 d-flex justify-content-end">
                  <span
                    className="placeholder text-dark col-12 me-2 rounded-pill"
                    style={{ height: "45px", width: "45px" }}
                  ></span>
                </div>
                <div className="col-6 bg-light rounded">
                  <a
                    className="text-dark"
                    style={{ textDecoration: "none", fontWeight: "bold" }}
                  >
                    <span className="placeholder text-dark col-12 me-2"></span>
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
            </div>
            <div className="modal-footer justify-content-center">
              <form
                className="w-100"
                onSubmit={(e) => makeComment(e)}
                data-post-id={post._id}
              >
                <div className="row w-100 m-0">
                  <div className="col-6 col-sm-8 p-0 pe-2 ">
                    <input
                      type="text"
                      placeholder="write a comment..."
                      className="form-control"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
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
          </div>
        </div>
      </div>
    );
  }
  if (data.length == 0) {
    return (
      <div
        className="modal fade"
        id={`comment${post._id}`}
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby={`comment${post._id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <h3 className="modal-title text-primary">
                  <span className="bi bi-chat-fill text-primaty me-2"></span>
                  {post.reactions?.comments?.length}
                </h3>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={() => setComments([])}
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body px-3 ">
              <div className="d-flex justify-content-center p-4">
                <p className="p-3 text-center"> no comments found</p>
              </div>
            </div>
            <div className="modal-footer justify-content-center">
              <form
                className="w-100"
                onSubmit={(e) => makeComment(e)}
                data-post-id={post._id}
              >
                <div className="row w-100 m-0">
                  <div className="col-6 col-sm-8 p-0 pe-2 ">
                    <input
                      type="text"
                      placeholder="write a comment..."
                      className="form-control"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
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
          </div>
        </div>
      </div>
    );
  }
  return (
    <div
      className="modal fade"
      id={`comment${post._id}`}
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby={`comment${post._id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">
              <h3 className="modal-title text-primary">
                <span className="bi bi-chat-fill text-primaty me-2"></span>
                {post.reactions?.comments?.length}
              </h3>
            </div>
            <button
              type="button"
              className="btn-close"
              onClick={() => setComments([])}
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body px-3 ">
            {data.map((i, index) => (
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
                      style={{ textDecoration: "none", fontWeight: "bold" }}
                    >
                      {`${i.name.firstName} ${i.name.lastName}`}
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
          <div className="modal-footer justify-content-center">
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
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
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
        </div>
      </div>
    </div>
  );
};

export default CommentShowModal;
