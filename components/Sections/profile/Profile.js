// import React, { useEffect, useRef, useState } from "react";
// import { useLocation } from "react-router";
// import Moment from "react-moment";
// import "./Profile.css";
// import API from "../../../api/API";
// import GetPosts from "../newsfeed/GetPosts";

// const Profile = ({ currentUser }) => {
//   const [isMe, setIsMe] = useState(Boolean);
//   const [img, setImg] = useState("");
//   const [post, setPost] = useState([]);
//   const [user, setUser] = useState([]);
//   const chngProfilebtn = useRef(null);
//   const setProfSpinner = useRef(null);
//   const chngCoverbtn = useRef(null);
//   const postLoader = useRef(null);
//   const loaderText = useRef(null);
//   const loader = useRef(null);
//   const setCoverSpinner = useRef(null);
//   const location = useLocation();
//   const search = location.search.toString().replace("?id=", "");
//   const [idx, setIdx] = useState("");
//   const reverseArr = [...post];
//   reverseArr.reverse();
//   let albumReverse = [];
//   if (user.length) {
//     albumReverse = [...user[0].album];
//     albumReverse.reverse();
//   }

//   const getImage = (e) => {
//     if (e.target.files.length > 0) {
//       const Reader = new FileReader();
//       Reader.onload = (e) => {
//         setImg(e.target.result);
//       };
//       Reader.readAsDataURL(e.target.files[0]);

//       chngProfilebtn.current.removeAttribute("disabled");
//       chngCoverbtn.current.removeAttribute("disabled");
//     }
//   };

//   const setCoverPic = async (e) => {
//     e.preventDefault();
//     try {
//       chngCoverbtn.current.setAttribute("disabled", "true");
//       setCoverSpinner.current.classList.remove("d-none");
//       const body = {
//         cover_img: img,
//       };
//       const option = {
//         headers: {
//           "Content-Type": "application/json",
//           Athorization: `Bearer ${currentUser._id}`,
//         },
//       };
//       const res = await API.put("/updateuserprofile", body, option);
//       console.log(res);
//       window.location.replace("/");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const setProfilePic = async (e) => {
//     e.preventDefault();
//     try {
//       chngProfilebtn.current.setAttribute("disabled", "true");
//       setProfSpinner.current.classList.remove("d-none");
//       const body = {
//         profile_img: img,
//       };
//       const option = {
//         headers: {
//           "Content-Type": "application/json",
//           Athorization: `Bearer ${currentUser._id}`,
//         },
//       };
//       const res = await API.put("/updateuserprofile", body, option);
//       console.log(res);
//       window.location.replace("/");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const requestProfile = async (id) => {
//     try {
//       loader.current.classList.remove("d-none");
//       loader.current.classList.add("loading");
//       postLoader.current.classList.remove("d-none");
//       loaderText.current.innerText = "Loading Posts...";
//       if (id === currentUser._id) {
//         setIsMe(true);
//       } else {
//         setIsMe(false);
//       }
//       const res = await API.get("/profile", {
//         headers: {
//           "Content-Type": "application/json",
//           Athorization: `Bearer ${id}`,
//         },
//       });
//       setPost([...res.data.userPosts]);
//       setUser([...res.data.user]);
//       loader.current.classList.add("d-none");
//     } catch (error) {
//       loader.current.classList.remove("loading");
//       loader.current.innerText = "loading failed!";
//       postLoader.current.classList.add("d-none");
//       loaderText.current.innerText = "No Post Found!";
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     requestProfile(idx);
//   }, [idx]);
//   useEffect(() => {
//     setIdx(search);
//   }, [search]);

//   return (
//     <div className="profile-container">
//       <div className="row gy-sm-5 cover-container border-bottom bg-white w-100 m-0 p-0 ">
//         <div className="d-none " ref={loader}></div>
//         {user.length > 0 ? (
//           <div className="col-12 profile-cover mt-0 border">
//             <img src={user[0].cover_img} className="rounded" alt="" />
//             <div className="profile-cover-main d-flex justify-content-center w-100">
//               <img
//                 src={user[0].cover_img}
//                 className="rounded"
//                 alt={currentUser.name}
//               />
//               {isMe && (
//                 <div
//                   className="position-absolute d-flex justify-content-center w-100"
//                   style={{ bottom: "0", zIndex: "100" }}
//                 >
//                   <div
//                     className="d-flex justify-content-end"
//                     style={{ width: "90%" }}
//                   >
//                     <button
//                       type="button"
//                       class="btn btn-secondary "
//                       data-bs-toggle="modal"
//                       data-bs-target="#changeCover"
//                     >
//                       <span className="bi bi-camera me-1"></span>
//                       <span className="d-none d-sm-inline-block">
//                         Change Cover
//                       </span>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="cover-bottom d-flex flex-column justify-content-center w-100">
//               <div className="d-flex justify-content-center w-100 position-relative">
//                 <div className="profile-img rounded-pill bg-white">
//                   {user.length > 0 ? (
//                     user[0].profile_img ? (
//                       <img
//                         src={user[0].profile_img}
//                         className="rounded-pill"
//                         alt=""
//                       />
//                     ) : (
//                       <span className="bi bi-person-circle"></span>
//                     )
//                   ) : null}
//                 </div>
//                 {isMe && (
//                   <div
//                     className="position-absolute d-flex justify-content-end"
//                     style={{ bottom: "0", width: "110px", zIndex: "100" }}
//                   >
//                     <button
//                       type="button"
//                       class="btn btn-secondary bi bi-camera rounded-pill"
//                       data-bs-toggle="modal"
//                       data-bs-target="#changeProfile"
//                     ></button>
//                   </div>
//                 )}
//               </div>
//               <div className="pt-2">
//                 <h3 className="text-center">{user[0].name}</h3>
//                 <p className="text-muted text-center">Your Bio</p>
//               </div>
//             </div>
//           </div>
//         ) : null}
//         <div className="col-12 d-flex justify-content-center pt-5 mt-3 mt-sm-5">
//           <div className="profile-nav pt-5">
//             <ul className="navbar border-top pt-3">
//               <li className="nav-item">
//                 <a href="" className="nav-link">
//                   Home
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="" className="nav-link">
//                   Home
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="" className="nav-link">
//                   Home
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="" className="nav-link">
//                   Home
//                 </a>
//               </li>
//               <li className="nav-item">
//                 <a href="" className="nav-link">
//                   Home
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* change Cover picture modal  */}

//       <div
//         class="modal fade"
//         id="changeCover"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabindex="-1"
//         aria-labelledby="changeCoverLabel"
//         aria-hidden="true"
//       >
//         <div class="modal-dialog modal-dialog-centered">
//           <div class="modal-content">
//             <div class="modal-header">
//               <h5 class="modal-title" id="staticBackdropLabel">
//                 Change your cover picture
//               </h5>
//               <button
//                 type="button"
//                 class="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div class="modal-body">
//               <form
//                 action=""
//                 id="changeCoverPic"
//                 onSubmit={(e) => setCoverPic(e)}
//               >
//                 <input
//                   type="file"
//                   className="form-control"
//                   onChange={(e) => getImage(e)}
//                   placeholder="Change Profile Picture"
//                 />
//               </form>
//               <div className="p-3">
//                 <img
//                   src={img}
//                   alt=""
//                   style={{ maxHeight: "250px", maxWidth: "100%" }}
//                 />
//               </div>
//             </div>
//             <div class="modal-footer">
//               <button
//                 type="submit"
//                 ref={chngCoverbtn}
//                 form="changeCoverPic"
//                 disabled
//                 className="btn btn-primary"
//               >
//                 <span
//                   class="spinner-border spinner-border-sm me-3 d-none"
//                   ref={setCoverSpinner}
//                   role="status"
//                   aria-hidden="true"
//                 ></span>
//                 Change Cover Picture
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* change profile picture modal  */}

//       <div
//         class="modal fade"
//         id="changeProfile"
//         data-bs-backdrop="static"
//         data-bs-keyboard="false"
//         tabindex="-1"
//         aria-labelledby="changeProfileLabel"
//         aria-hidden="true"
//       >
//         <div class="modal-dialog modal-dialog-centered">
//           <div class="modal-content">
//             <div class="modal-header">
//               <h5 class="modal-title" id="staticBackdropLabel">
//                 Change your profile picture
//               </h5>
//               <button
//                 type="button"
//                 class="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div class="modal-body">
//               <form
//                 action=""
//                 id="changeProfilePic"
//                 onSubmit={(e) => setProfilePic(e)}
//               >
//                 <input
//                   type="file"
//                   className="form-control"
//                   onChange={(e) => getImage(e)}
//                   placeholder="Change Profile Picture"
//                 />
//               </form>
//               <div className="p-3">
//                 <img
//                   src={img}
//                   alt=""
//                   style={{ maxHeight: "250px", maxWidth: "100%" }}
//                 />
//               </div>
//             </div>
//             <div class="modal-footer">
//               <button
//                 type="submit"
//                 ref={chngProfilebtn}
//                 form="changeProfilePic"
//                 disabled
//                 className="btn btn-primary"
//               >
//                 <span
//                   class="spinner-border spinner-border-sm me-3 d-none"
//                   ref={setProfSpinner}
//                   role="status"
//                   aria-hidden="true"
//                 ></span>
//                 Change Profile Picture
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bottom-container d-flex justify-content-center px-sm-5 px-md-5 py-2">
//         <div className="row row-cols-1 row-cols-md-2 gy-2 gy-md-0 mt-lg-3 px-sm-3 px-md-5 bottom-row gx-4">
//           <div className="col">
//             <div className="row row-cols-1 gy-3 bottom-left">
//               {isMe && (
//                 <div className="col px-3 py-3 bg-white border rounded">
//                   <h3>
//                     <b>Your Profile</b>
//                   </h3>
//                   <p className="text-muted px-2">
//                     Add details to connect with more friends and help them to
//                     get to know you better.
//                   </p>
//                   <button className="btn btn-primary w-100">
//                     {" "}
//                     Get Started{" "}
//                   </button>
//                 </div>
//               )}
//               {isMe && (
//                 <div className="col p-3 bg-white border rounded">
//                   <h3>
//                     <b>Intro</b>
//                   </h3>
//                   <button className="btn btn-light w-100 mt-2 mb-3">
//                     {" "}
//                     Edit Details{" "}
//                   </button>
//                   <button className="btn btn-light w-100 mb-3">
//                     {" "}
//                     Add Hobbies{" "}
//                   </button>
//                   <button className="btn btn-light w-100 mb-3">
//                     {" "}
//                     Add Features{" "}
//                   </button>
//                 </div>
//               )}
//               <div className="col bg-white border rounded p-3">
//                 <div className="d-flex justify-content-between">
//                   <h5>Photos</h5>
//                   <a href="#">See All</a>
//                 </div>
//                 {albumReverse.length && (
//                   <div className="row row-cols-2 gx-3 gy-2">
//                     <div className="col p-1">
//                       <div className="border">
//                         <img
//                           src={albumReverse[0]}
//                           alt=""
//                           style={{
//                             height: "125px",
//                             width: "100%",
//                             padding: ".3rem",
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col p-1">
//                       <div className="border">
//                         <img
//                           src={albumReverse[1]}
//                           alt=""
//                           style={{
//                             height: "125px",
//                             width: "100%",
//                             padding: ".3rem",
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col p-1">
//                       <div className="border">
//                         <img
//                           src={albumReverse[2]}
//                           alt=""
//                           style={{
//                             height: "125px",
//                             width: "100%",
//                             padding: ".3rem",
//                           }}
//                         />
//                       </div>
//                     </div>
//                     <div className="col p-1">
//                       <div className="border">
//                         <img
//                           src={albumReverse[3]}
//                           alt=""
//                           style={{
//                             height: "125px",
//                             width: "100%",
//                             padding: ".3rem",
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//               <div className="col bg-white border rounded p-3">
//                 <div className="d-flex justify-content-between">
//                   <h5>Friends</h5>
//                   <a href="#">See All</a>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="col">
//             <div className="row row-cols-1 gy-4">
//               {/* Post status */}

//               <div className="col bg-white border rounded">
//                 <div className="row justify-content-center align-items-center">
//                   {isMe ? (
//                     <div className="col-3 pt-3 pb-3">
//                       {currentUser.image ? (
//                         <img
//                           src={currentUser.image}
//                           className="postimg rounded-pill"
//                           alt={currentUser.name}
//                         />
//                       ) : (
//                         <span
//                           className="bi bi-person-circle ps-3"
//                           style={{ fontSize: "1.5rem" }}
//                         ></span>
//                       )}
//                     </div>
//                   ) : (
//                     <div className="col-3 pt-3 pb-3">
//                       {user.length && user[0].profile_img ? (
//                         <img
//                           src={user[0].profile_img}
//                           className="postimg rounded-pill"
//                           alt={user[0].name}
//                         />
//                       ) : (
//                         <span
//                           className="bi bi-person-circle ps-3"
//                           style={{ fontSize: "1.5rem" }}
//                         ></span>
//                       )}
//                     </div>
//                   )}
//                   {isMe ? (
//                     <div className="col-9 pe-5 pt-3 pb-3">
//                       <div className="bg-light statuscol border">
//                         <form action="">
//                           <input
//                             type="text"
//                             data-bs-toggle="modal"
//                             data-bs-target="#profcreatepost"
//                             placeholder={`What's on your mind, ${currentUser.name}?`}
//                             className="form-control profstatusinp bg-light"
//                             disabled
//                           />
//                         </form>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="col-9 pe-5 pt-3 pb-3">
//                       <div className="bg-light statuscol border">
//                         <form action="">
//                           {user.length && (
//                             <input
//                               type="text"
//                               data-bs-toggle="modal"
//                               data-bs-target="#profcreatepost"
//                               placeholder={`Post on ${user[0].name}'s timeline'`}
//                               className="form-control profstatusinp bg-light"
//                               disabled
//                             />
//                           )}
//                         </form>
//                       </div>
//                     </div>
//                   )}
//                   <hr className="mb-1 w-75 w-sm-100" />
//                   <div className="col-12 py-2 px-3">
//                     <div className="d-flex justify-content-between align-items-center px-3">
//                       <div className="mx-2 postbottom ">
//                         <span className="bi bi-camera-reels-fill text-danger pe-2"></span>{" "}
//                         Live Video
//                       </div>
//                       <div className="mx-2 postbottom ">
//                         <span className="bi bi-images text-success pe-2"></span>{" "}
//                         Photo / Video
//                       </div>
//                       <div className="mx-2 postbottom ">
//                         <span className="bi bi-emoji-smile text-warning pe-2"></span>{" "}
//                         Feeling activity
//                       </div>
//                     </div>
//                   </div>

//                   <div
//                     class="modal fade"
//                     id="profcreatepost"
//                     data-bs-backdrop="static"
//                     data-bs-keyboard="false"
//                     tabindex="-1"
//                     aria-labelledby="profcreatepostLabel"
//                     aria-hidden="true"
//                   >
//                     <div class="modal-dialog modal-dialog-centered">
//                       <div class="modal-content">
//                         <div class="modal-header">
//                           <div className="modal-title">
//                             <h3 class="modal-title">Create your post.</h3>
//                           </div>
//                           <button
//                             type="button"
//                             class="btn-close"
//                             data-bs-dismiss="modal"
//                             aria-label="Close"
//                           ></button>
//                         </div>
//                         <div class="modal-body px-1 ">
//                           <form
//                             action="#"
//                             className="needs-validation"
//                             onSubmit="{e => handlePostForm(e)}"
//                             id="signform"
//                           >
//                             <div className="row gy-2 gx-2 px-0 px-sm-3">
//                               <div className="col-12">
//                                 <textarea
//                                   name="status"
//                                   className="form-control postinp"
//                                   placeholder={`Whats on yout mind, ${currentUser.name}?`}
//                                   id="status"
//                                   value="{userPost}"
//                                   onChange="{e => setUserPost(e.target.value)}"
//                                   required
//                                 ></textarea>
//                                 <label htmlFor="imagepost mt-2">
//                                   Upload a photo:{" "}
//                                 </label>
//                                 <input
//                                   type="file"
//                                   id="imagepost"
//                                   accept="img/**"
//                                   className="form-control"
//                                   onChange="{e => setimage(e)}"
//                                 />
//                               </div>

//                               <div className="col-12">
//                                 <button
//                                   type="submit"
//                                   className="btn btn-primary w-100"
//                                 >
//                                   Post
//                                 </button>
//                               </div>
//                             </div>
//                           </form>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* user posts  */}

//               {reverseArr.length > 0 ? (
//                 reverseArr.map((i) => (
//                   <GetPosts i={i} currentUser={currentUser} />
//                 ))
//               ) : (
//                 <div className="col-12 bg-white border rounded p-2">
//                   <div className="">
//                     <div className="text-center">
//                       <h4 className="text-center">
//                         <span
//                           className="spinner-border spinner-border-md me-2"
//                           ref={postLoader}
//                         ></span>
//                         <span ref={loaderText}></span>
//                       </h4>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// // <div className="col-12 bg-white border rounded p-2">
// //     <div className="">
// //         <div className="d-flex justify-content-between py-1 px-1 px-sm-3">
// //             <div className="d-flex justify-content-between">
// //                 {i.user_image ? <img src={i.user_image} alt={i.name} className="rounded-pill statusimg me-2" alt={i.name} />
// //                     : <span className="bi bi-person-circle pe-3" style={{ fontSize: "1.5rem" }}></span>}
// //                 <div className=" text-start">
// //                     <h6 className="mt-1">{i.name}</h6>
// //                     <p className="text-muted text-start"><Moment fromNow interval={1000}>{i.time}</Moment></p>
// //                 </div>
// //             </div>
// //             <span className="bi bi-justify"></span>
// //         </div>
// //         <div>
// //             <p className="px-1">{i.post}</p>
// //             {i.image && <img src={i.image} alt={i.name} width="100%" className="px-2" style={{ objectFit: "contain" }} />}
// //         </div>
// //         <div className="d-flex justify-content-between align-items-baseline px-2 px-sm-4 postreactcount">
// //             <a href="" className="text-dark " style={{ textDecoration: "none" }}><span className="bi bi-hand-thumbs-up-fill text-primary pe-1"></span> 1.1k</a>
// //             <div>
// //                 <a href="" className="text-dark" style={{ textDecoration: "none" }}><span className="pe-0 pe-sm-2">756</span> Comment</a>
// //                 <a href="" className="text-dark ms-2" style={{ textDecoration: "none" }}><span className="pe-0 pe-sm-2">1k</span> shares</a>
// //             </div>
// //         </div>
// //         <hr className="mt-1 mb-2 m-sm-3" />
// //         <div className="d-flex justify-content-around postreact">
// //             <a href="" className="text-dark" style={{ textDecoration: "none" }}><span className="bi bi-hand-thumbs-up pe-2"></span> Like</a>
// //             <a href="" className="text-dark" style={{ textDecoration: "none" }}><span className="bi bi-chat pe-2"></span> Comment</a>
// //             <a href="" className="text-dark" style={{ textDecoration: "none" }}><span className="bi bi-share pe-2"></span> Share</a>
// //         </div>
// //     </div>
// // </div>
