import React, { useEffect, useState } from "react";
import API from "../API/API";

const LikeShowModal = ({ post, fetchLike, setFetchLike }) => {
  const [postId, setPostId] = useState(post._id);
  const [data, setData] = useState(null);

  async function getLikers(post_id) {
    setData(null);
    const res = await API.get(`likes/${post_id}`, {
      headers: { "Content-Type": "application/json" },
    });
    setData(res.data);
  }
  useEffect(() => {
    if (fetchLike) {
      getLikers(postId);
      setFetchLike((prev) => !prev);
    }
  }, [fetchLike]);
  if (!data) {
    return (
      <div
        className="modal fade"
        id={`modal${post._id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby={`modal${post._id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <h3 className="modal-title">
                  <span className="bi bi-hand-thumbs-up-fill text-primary me-2"></span>
                  {post.reactions?.likes?.liker?.length}
                </h3>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="d-flex justify-content-center p-4">
              <p
                className="text-center spinner spinner-border"
                role="status"
              ></p>
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
        id={`modal${post._id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby={`modal${post._id}Label`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <div className="modal-title">
                <h3 className="modal-title">
                  <span className="bi bi-hand-thumbs-up-fill text-primary me-2"></span>
                  {post.reactions?.likes?.liker?.length}
                </h3>
              </div>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="d-flex justify-content-center p-4">
              <p className="text-center" id={`like${post._id}`} role="status">
                not found
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="modal fade"
      id={`modal${post._id}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby={`modal${post._id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">
              <h3 className="modal-title">
                <span className="bi bi-hand-thumbs-up-fill text-primary me-2"></span>
                {data.length}
              </h3>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body px-1 py-1 ">
            <div className="row row-cols-1 w-100 m-0 gy-3">
              {data.length > 0 &&
                data.map((i, index) => (
                  <div className="col" key={index}>
                    <div className="d-flex justify-content-start text-primary p-2">
                      <img
                        src={i.image}
                        alt=""
                        className="rounded-pill"
                        style={{
                          height: "35px",
                          width: "35px",
                          objectFit: "cover",
                        }}
                      />
                      <p className="text-dark ms-3">
                        {`${i.name.firstName} ${i.name.lastName}`}{" "}
                        {i.verified === true && (
                          <span
                            className="bi bi-check rounded-pill ms-2 d-inline-flex justify-content-center align-items-center p-2 text-white bg-primary"
                            style={{ height: "15px", width: "15px" }}
                          ></span>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeShowModal;
