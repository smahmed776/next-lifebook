import React, { Fragment, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import API from "../API/API";
import { fetchPost } from "../globalcontext/callApi";
import CreateAccoutModal from "../Modals/CreateAccoutModal";
import styles from "./Homepage.module.css";
import HomePageFooter from "./HomePageFooter";

const HomePage = () => {
  const [valid, setValid] = useState("");
  const [invalid, setInvalid] = useState("");
  const lspinner = useRef();
  const lbtn = useRef();

  const logSuccess = useRef();
  const { register, handleSubmit } = useForm();

  const handleLoginForm = async (dataObj) => {
    lbtn.current.setAttribute("disabled", "true");
    lspinner.current.classList.remove("d-none");
    const { data, isError, error } = await fetchPost({
      url: "/login",
      data: dataObj
    });
    if (isError) {
      lspinner.current.classList.add("d-none");
      lbtn.current.removeAttribute("disabled");
      setValid("");
      setInvalid(error.data.message);
    }
    if (data) {
      lspinner.current.classList.add("d-none");
      setInvalid("");
      setValid(data.message);
    }
    // if (!e.target.checkValidity()) {
    //   e.preventDefault();
    //   e.stopPropagation();
    // } else {
    //   try {
    //     const email = e.target.elements.lemail.value;
    //     const password = e.target.elements.lpassword.value;
    //     const body = {
    //       email,
    //       password
    //     };
    //     const option = { headers: { "Content-Type": "application/json" } };
    //     const res = await API.post("/login", body, option);
    //     const token = res.data.token;
    //     // console.log(res);
    //     isLogged.push([token]);
    //     setIsLogged([...isLogged]);
    //     localStorage.setItem("token", JSON.stringify(token));
    //     logSuccess.current.classList.remove("d-none");
    //     setTimeout(() => {
    //       logSuccess.current.classList.add("d-none");
    //     }, 3000);

    //     window.location.reload();
    //   } catch (error) {
    //     console.log(error.response);
    //     const alert = document.getElementById("halert");
    //     lspinner.current.classList.add("d-none");
    //     lbtn.current.removeAttribute("disabled");
    //     alert.classList.remove("d-none");
    //     alert.innerText = `${error.response.data}`;
    //     setTimeout(() => {
    //       alert.classList.add("d-none");
    //     }, 5000);
    //   }
    // }
  };

  return (
    <Fragment>
      <div
        className={`bg-light d-flex justify-content-center align-items-center vh-100 ${styles.homepage_container}`}
      >
        {invalid && (
        <div
          className={`alert alert-danger d-flex align-items-center ${styles.homepage_alert}`}
          id="halert"
          role="alert"
        >
          <span className="bi bi-exclamation-triangle-fill me-2"></span>
          <div>{invalid}</div>
        </div>
        )
        }
        {valid && (
        <div
          className={`alert alert-success d-flex align-items-center ${styles.homepage_alert}`}
          ref={logSuccess}
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
        </div>
        )}
        <div className="row gx-2 gy-5 gy-md-0 gx-md-5 p-3 p-md-5">
          <div className="col-12 col-md-6 col-lg-7 h-50 d-flex justify-content-center align-items-center flex-column p-4">
            <div className="px-md-2 px-lg-5 ">
              <h1 className="text-primary text-start">Lifebook</h1>
              <h3>
                Lifebook helps you connect and share with the people in your
                life
              </h3>
              <img src="" id="img" alt="" />
            </div>
          </div>
          <div className="col-12 col-md-6 col-lg-5 ">
            <div
              className={`${styles.login_form} pt-2 border bg-white px-2 shadow rounded`}
            >
              <form onSubmit={handleSubmit(handleLoginForm)}>
                <div className="row row-cols-1 gy-4 p-2">
                  <div className="col">
                    <input
                      type="email"
                      name="name"
                      id="lemail"
                      className="form-control"
                      placeholder="Email address"
                      {...register("email")}
                      required
                    />
                  </div>
                  <div className="col">
                    <input
                      type="password"
                      name="password"
                      id="lpassword"
                      className="form-control"
                      placeholder="Password"
                      {...register("password")}
                      required
                    />
                  </div>
                  <div className="col px-2">
                    <button
                      type="submit"
                      ref={lbtn}
                      className="btn btn-primary w-100"
                    >
                      <span
                        className="spinner-border spinner-border-sm me-3 d-none"
                        ref={lspinner}
                        role="status"
                        aria-hidden="true"
                      />
                      Login
                    </button>
                  </div>
                  <div className="col">
                    <a href="#" className="nav-link text-center">
                      {" "}
                      Forgotten password?{" "}
                    </a>
                    <hr />
                  </div>
                  {/* Create Account Modal */}
                  <div className="col px-5 d-flex justify-content-center">
                    <button
                      type="button"
                      className="btn btn-success mb-3"
                      data-bs-toggle="modal"
                      data-bs-target="#signup"
                    >
                      Create Account
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="w-100 px-3 pt-3">
              <p>
                <a href="#" className="nav-link d-inline">
                  Create a page
                </a>{" "}
                for a celebrity, band or business.
              </p>
            </div>
          </div>

          <CreateAccoutModal />
        </div>
      </div>
      <HomePageFooter />
    </Fragment>
  );
};

export default HomePage;
