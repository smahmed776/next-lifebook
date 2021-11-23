import React from 'react'

const DeletePostModal = ({post, deletePost}) => {
    return (
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
    )
}

export default DeletePostModal
