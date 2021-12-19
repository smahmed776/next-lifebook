import React, { useRef, useState } from "react";
import API from "../API/API";
import { useRouter } from "next/router";

const CreatePostModal = ({ user }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
    if (postImg.length <= 0 && postText === "" && videoUrl === "" && imageUrl === '') {
      alert("Please write something or upload a photo");
    } else {
      if(videoUrl !== ""){
        setImageUrl("")
        setPostImg([])
      }
      try {
        createPostBtn.current.setAttribute("disabled", "true");
        postSpinner.current.classList.remove("d-none");
        setValid(null)
        const body = {
          author_id: user._id,
          author_username: user.username,
          author_name: user.name,
          post: postText,
          image: imageUrl? imageUrl : postImg,
          video: videoUrl !== "" && videoUrl,
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
                      {imageUrl && (
                        <div className="col position-relative">
                          <div>
                            <img
                              src={imageUrl}
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
                              onClick={() => setImageUrl("")}
                            ></button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  <label className="imagepost mt-2">Upload a photo: (max size: 1mb)</label>
                  <input
                    type="file"
                    id="imagepost"
                    accept="img/**"
                    className="form-control"
                    onChange={(e) => setimage(e)}
                    />
                  <label className="imagepost mt-2">Image Url:</label>
                  <input className="form-control" type="url" name="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />

                  <label className="form-label mt-2">Video Url: (supports youtube, vimeo video url)</label>
                  <input className="form-control" type="url" name="videoUrl" value={videoUrl} onChange={e => setVideoUrl(e.target.value)} />
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
