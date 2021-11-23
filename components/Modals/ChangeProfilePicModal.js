import React, { useEffect, useRef, useState } from "react";
import API from "../API/API";
import {useRouter} from 'next/router'

const ChangeProfilePicModal = () => {
  const [finalImage, setFinalImage] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [img, setImg] = useState("");
  const chngProfilebtn = useRef();
  const setProfSpinner = useRef();
  const history = useRouter()
  const getImage = (e) => {
    if (e.target.files.length > 0) {
      const Reader = new FileReader();
      Reader.onload = (e) => {
        setImg(e.target.result);
      };
      Reader.readAsDataURL(e.target.files[0]);

      chngProfilebtn.current.removeAttribute("disabled");
    }
  };

  const handleURL = (e) => {
    const value = e.target.value;
    const pattern = {
      http: /(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\/.[-a-zA-Z0-9@:%_\+.~#?&=]{0,256}\.*/g,
    };

    if (value.match(pattern.http)) {
      setImgUrl(value);
      chngProfilebtn.current.removeAttribute("disabled");
    } else {
      chngProfilebtn.current.setAttribute("disabled", "true");
    }
  };

  const setProfilePic = async (e) => {
    e.preventDefault();
    try {
      chngProfilebtn.current.setAttribute("disabled", "true");
      setProfSpinner.current.classList.remove("d-none");
      if (!finalImage) return;
      
      const body = {
        image: finalImage,
        type: "profilepic"
      };
      const option = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await API.put("/updateuser", body, option);
      history.reload();
    } catch (error) {
      console.log(error);
      chngProfilebtn.current.removeAttribute("disabled");
      setProfSpinner.current.classList.add("d-none");
    }
  };

  useEffect(() => {
    if (imgUrl) {
      setFinalImage(imgUrl);
    } else if (img) {
      setFinalImage(img);
    }
  }, [img, imgUrl]);
  return (
    <div
      className="modal fade"
      id="changeProfile"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby="changeProfileLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">
              Change your profile picture
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form
              action=""
              id="changeProfilePic"
              onSubmit={(e) => setProfilePic(e)}
            >
              <input
                type="file"
                className="form-control"
                onChange={(e) => getImage(e)}
                placeholder="Change Profile Picture"
              />
            </form>
            <div className="p-3">
              <img
                src={img}
                alt=""
                style={{ maxHeight: "250px", maxWidth: "100%" }}
              />
            </div>
            <div className="p-3">
              <p className="p-1">Image URL :</p>
              <input
                type="url"
                placeholder="www.example.com/profile.jpg  or  example.com/pic.jpg"
                className="form-control"
                onKeyUp={(e) => handleURL(e)}
                form="changeProfilePic"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              ref={chngProfilebtn}
              form="changeProfilePic"
              disabled
              className="btn btn-primary"
            >
              <span
                className="spinner-border spinner-border-sm me-3 d-none"
                ref={setProfSpinner}
                role="status"
                aria-hidden="true"
              ></span>
              Change Profile Picture
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeProfilePicModal;
