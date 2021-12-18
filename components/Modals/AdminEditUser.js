import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { fetchPost } from "../globalcontext/callApi";

const AdminEditUser = ({ id, user }) => {
  const sspinner = useRef();
  const sbtn = useRef();
  const salert = useRef();
  const signSuccess = useRef();
  const signForm = useRef();
  const spassword = useRef();
  const { register, handleSubmit } = useForm();
  const [valid, setValid] = useState("");
  const [invalid, setInvalid] = useState([]);

  const onSubmit = async (dataobj) => {
    if (
      signForm.current.elements.spassword.classList.value.includes("is-invalid")
    ) {
      setValid("");
      setInvalid(["Password invalid"]);
    } else {
      signForm.current.classList.add("was-validated");
      sbtn.current.setAttribute("disabled", "true");
      sspinner.current.classList.remove("d-none");
      const { data, isError, error } = await fetchPost({
        url: "/signup",
        data: dataobj,
      });

      if (isError) {
        setValid("");
        setInvalid(error.data.errors);
        sspinner.current.classList.add("d-none");
        sbtn.current.removeAttribute("disabled");
      }
      if (data) {
        setInvalid([]);
        setValid(data.message);
        signForm.current.reset();
        sspinner.current.classList.add("d-none");
        sbtn.current.removeAttribute("disabled");
        signForm.current.classList.remove("was-validated");
        spassword.current?.classList.remove("is-valid");
        signForm.current.classList.add("needs-validation");
      }
    }
  };

  const passvalidate = (e) => {
    const pattern = {
      capitalLtr: /[A-Z]/g,
      smallLtr: /[a-z]/g,
      nmbr: /[0-9]/g,
      length: 8,
    };
    let con1 = "";
    let con2 = "";
    let con3 = "";
    let con4 = "";

    if (!e.target.value.match(pattern.capitalLtr)) {
      con1 = "one capital letter,";
      e.target.classList.add("is-invalid");
      e.target.classList.remove("is-valid");
    }
    if (!e.target.value.match(pattern.smallLtr)) {
      con2 = "one small letter,";
      e.target.classList.add("is-invalid");
      e.target.classList.remove("is-valid");
    }
    if (!e.target.value.match(pattern.nmbr)) {
      con3 = "one number,";
      e.target.classList.add("is-invalid");
      e.target.classList.remove("is-valid");
    }
    if (e.target.value.length < pattern.length) {
      con4 = "8 characters long";
      e.target.classList.add("is-invalid");
      e.target.classList.remove("is-valid");
    }
    if (
      con1.length > 0 ||
      con2.length > 0 ||
      con3.length > 0 ||
      con4.length > 0
    ) {
      document.getElementById("spassfeedback").innerText =
        "Password must have atleast " +
        con1 +
        " " +
        con2 +
        " " +
        con3 +
        " " +
        con4 +
        "!";
    } else if (!e.target.value) {
      document.getElementById("spassfeedback").innerText = "Password required";
    } else {
      e.target.classList.add("is-valid");
      e.target.classList.remove("is-invalid");
    }
  };
  return (
    <div
      className="modal fade"
      id={id}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex="-1"
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">
              <h3 className="modal-title" id="staticBackdropLabel">
                {`${user.name.firstName} ${user.name.lastName}`}
              </h3>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {valid && (
              <div
                className="alert alert-success d-flex justify-content-center"
                ref={signSuccess}
              >
                <p className="mb-2">
                  <span className="bi bi-check-circle-fill text-success me-2"></span>{" "}
                  {valid}
                </p>
              </div>
            )}
            {invalid.length > 0 && (
              <div
                className="alert alert-danger d-flex flex-column justify-content-center "
                ref={salert}
              >
                {invalid.map((text) => (
                  <p className="mb-2" key={text}>
                    <span className="bi bi-x-circle-fill me-2"></span> {text}
                  </p>
                ))}
              </div>
            )}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="needs-validation"
              ref={signForm}
              id="signform"
            >
              <div className="row gy-2 gx-2 px-3">
                <div className="col-12">
                  <label htmlFor="firstName" className="form-label">
                    First Name
                  </label>
                  <div className="row m-0 w-100 gx-1">
                    <div className="col-10">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={user.name.firstName}
                        {...register("firstName")}
                        required
                        disabled
                      />
                    </div>
                    <div className="col-2">
                      <button className="btn btn-info bi bi-pen"></button>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <label htmlFor="lastName" className="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={user.name.lastName}
                    {...register("lastName")}
                    required
                    disabled
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder={user.email}
                    {...register("email")}
                    required
                    disabled
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Username:{" "}
                  </label>
                  <input
                    type="text"
                    maxLength={35}
                    className="form-control"
                    placeholder={user.username}
                    {...register("username")}
                    required
                    disabled
                  />
                </div>

                <div className="col-12">
                  <p className="text-dark mb-2">Date of Birth: </p>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={user.Dob}
                    {...register("Dob")}
                    required
                    disabled
                  />
                </div>

                <div className="col-12">
                  <button
                    type="submit"
                    ref={sbtn}
                    className="btn btn-success w-100"
                  >
                    <span
                      className="spinner-border spinner-border-sm me-3 d-none"
                      ref={sspinner}
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Sign Up
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

export default AdminEditUser;
