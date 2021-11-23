import React, { useRef, useState } from "react";
import API from "../API/API";
import { useRouter } from "next/router";

const CreatePostModal = ({ user }) => {
  const [postText, setPostText] = useState("");
  const [postImg, setPostImg] = useState([]);
  const [valid, setValid] = useState(null);
  const createPostBtn = useRef(null);
  const postSpinner = useRef(null);
  const history = useRouter();

  const removeImage = (e) => {
    const img = e.target.dataset.bsImg;
    setPostImg(postImg.filter((pimg) => pimg !== img));
  };

  const setimage = (e) => {
    if (e.target.files.length > 0) {
      const Reader = new FileReader();
      Reader.onload = (e) => {
        setPostImg((prev) => [...prev, e.target.result]);
      };
      Reader.readAsDataURL(e.target.files[0]);
      e.target.value = "";
    } else {
      return null;
    }
  };

  const handlePostForm = async (e) => {
    e.preventDefault();
    if (postImg.length <= 0 && postText === "") {
      alert("Please write something or upload a photo");
    } else {
      try {
        createPostBtn.current.setAttribute("disabled", "true");
        postSpinner.current.classList.remove("d-none");
        setValid(null)
        const body = {
          author_id: user._id,
          author_username: user.username,
          author_name: user.name,
          author_image: user.profile?.profileImage,
          post: postText,
          image: postImg,
          privacy: "public"
        };
        const option = {
          headers: { "Content-Type": "application/json" }
        };
        await API.post("/newpost", body, option);
        setValid("Post Created Successfully!")
        setPostText("");
        setPostImg([]);
        createPostBtn.current.removeAttribute("disabled");
        postSpinner.current.classList.add("d-none");
      } catch (error) {
        createPostBtn.current.removeAttribute("disabled");
        postSpinner.current.classList.add("d-none");
        console.log(error.response, error);
      }
    }
  };
  return (
    <div
      className="modal fade"
      id="createpost"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="createpostLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">
              <h3 className="modal-title">Create your post.</h3>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body px-1 ">
          {valid && <div
          className="alert alert-success d-flex align-items-center"
          role="alert"
        >
          <span
            className="bi bi-check-circle-fill text-success flex-shrink-0 me-2"
            width="24"
            height="24"
            role="img"
            aria-label="Success:"
          />
          <div>{valid}</div>
        </div>}
            <form
              className="needs-validation"
              onSubmit={(e) => handlePostForm(e)}
              id="creatPostForm"
            >
              <div className="row gy-2 gx-2 px-0 px-sm-3">
                <div className="col-12">
                  <textarea
                    name="status"
                    className="form-control postinp"
                    placeholder={`Whats on yout mind, ${user.name?.firstName}?`}
                    id="status"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  ></textarea>
                  {postImg.length > 0 && (
                    <div className="row row-cols-3 gx-3 m-0 w-100 my-3">
                      {postImg.map((img) => (
                        <div className="col position-relative" key={img}>
                          <div>
                            <img
                              src={img}
                              alt=""
                              style={{ maxHeight: "150px", width: "100%" }}
                            />
                          </div>
                          <div
                            className="position-absolute"
                            style={{ top: "0", right: "0" }}
                          >
                            <button
                              className="btn btn-close"
                              data-bs-img={img}
                              onClick={(e) => removeImage(e)}
                            ></button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <label htmlFor="imagepost mt-2">Upload a photo: </label>
                  <input
                    type="file"
                    id="imagepost"
                    accept="img/**"
                    className="form-control"
                    onChange={(e) => setimage(e)}
                  />
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    ref={createPostBtn}
                    className="btn btn-primary w-100"
                  >
                    <span
                      className="spinner-border spinner-border-sm me-2 d-none"
                      ref={postSpinner}
                    ></span>
                    Post
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

export default CreatePostModal;