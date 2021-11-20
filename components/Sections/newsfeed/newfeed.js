import React, { useContext, useRef, useState } from 'react';
import Moment from 'react-moment'
import API from '../../../api/API';
import { Link } from 'react-router-dom'
import './newsfeed.css'
import { IsLoggedContext } from '../../../globalcontext/isLogged';
import { LikerContext } from '../../../globalcontext/likers';
import GetPosts from './GetPosts';

const NewsFeed = ({ currentUser }) => {

    const { postState, isCreatedPostState } = useContext(IsLoggedContext);
    const [isCreatedPost, setIsCreatedPost] = isCreatedPostState;
    const [posts] = postState;
    const [userPost, setUserPost] = useState("");
    const createPostBtn = useRef(null);
    const postSpinner = useRef(null)
    const [userImg, setUserImg] = useState("");
    const reverseArr = [...posts]
    reverseArr.reverse();



    const setimage = e => {
        if (e.target.files.length > 0) {
            const Reader = new FileReader();
            Reader.onload = e => {
                setUserImg(e.target.result);
            }
            Reader.readAsDataURL(e.target.files[0])

            
        } else {
            return null;
        }
    }

    const handlePostForm = async (e) => {
        e.preventDefault();
        const files = e.target.elements.imagepost.files.length;
        const post = e.target.elements.status.value
        if( files <= 0 && post === ''){ 
           alert("Please write something or upload a photo")
        } else {
            try {
                createPostBtn.current.setAttribute('disabled', 'true');
                postSpinner.current.classList.remove('d-none')
                const body = {
                    _id: currentUser._id,
                    name: currentUser.name,
                    image: currentUser.image,
                    post: userPost,
                    time: new Date(),
                    image: userImg,
                    user_image: currentUser.image,
                    clearance: "public"
                }
                const option = {
                    headers: { "Content-Type": "application/json" }
                }
                await API.post("/newpost", body, option)
                setIsCreatedPost([
                    "new post"
                ])
                setUserPost('');
                setUserImg('')
                e.target.elements.imagepost.value= "";
                createPostBtn.current.removeAttribute('disabled');
                postSpinner.current.classList.add('d-none')
    
            } catch (error) {
                createPostBtn.current.removeAttribute('disabled');
                postSpinner.current.classList.add('d-none')
                console.log(error);
            }
        }
    }




    return (
        <section className="feed-container">
            <div className="row feedrow gy-2 gy-sm-4 px-0 px-sm-3 ps-lg-5">
                <div className="col-12 bg-white rounded p-0 p-sm-2 mt-3 mt-sm-5 border">
                    <div className="row gy-3 gy-sm-3 p-0 ps-sm-5 pt-3 w-100 m-0 justify-content-center align-items-center pe-1 pe-sm-3">
                        <div className="col-12 d-flex align-items-center justify-content-center pe-0 me-2">
                            <div className="d-flex justify-content-evenly" style={{width: "85%"}}>

                            {currentUser.image ? <img src={currentUser.image} className="postimg rounded-pill" alt="" />
                                : <span className="bi bi-person-circle ps-2" style={{ fontSize: "1.5rem" }}></span>}
                            <div className="bg-light statuscol border">
                                <form action="" className="h-100">
                                    <input type="text" data-bs-toggle="modal" data-bs-target="#createpost" placeholder={`What's on your mind, ${currentUser.name}?`} className="form-control statusinp bg-light" disabled />
                                </form>
                            </div>
                            </div>
                        </div>

                        <hr className="mb-1 w-75 w-sm-100" />
                        <div className="col-12">
                            <div className="d-flex justify-content-evenly align-items-center pb-3">
                                <div className="mx-2 postbottom "><span className="bi bi-camera-reels-fill text-danger pe-2"></span> Live Video</div>
                                <div className="mx-2 postbottom "><span className="bi bi-images text-success pe-2"></span> Photo / Video</div>
                                <div className="mx-2 postbottom "><span className="bi bi-emoji-smile text-warning pe-2"></span> Feeling activity</div>
                            </div>
                        </div>

                        <div class="modal fade" id="createpost" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="createpostLabel" aria-hidden="true">
                            <div class="modal-dialog modal-dialog-centered">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <div className="modal-title">
                                            <h3 class="modal-title">Create your post.</h3>
                                        </div>
                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div class="modal-body px-1 ">
                                        <form action="#" className="needs-validation" onSubmit={e => handlePostForm(e)} id="signform">
                                            <div className="row gy-2 gx-2 px-0 px-sm-3">

                                                <div className="col-12">
                                                    <textarea name="status" className="form-control postinp" placeholder={`Whats on yout mind, ${currentUser.name}?`}
                                                        id="status" value={userPost} onChange={e => setUserPost(e.target.value)} >

                                                    </textarea>

                                                    <div className="p-3">
                                                        <img src={userImg} alt="" style={{ maxHeight: "150px", maxWidth: "30%" }} />
                                                    </div>
                                                    <label htmlFor="imagepost mt-2">Upload a photo: </label>
                                                    <input type="file" id="imagepost" accept="img/**" className="form-control" onChange={e => setimage(e)} />
                                                </div>


                                                <div className="col-12">
                                                    <button type="submit" ref={createPostBtn} className="btn btn-primary w-100">
                                                        <span className="spinner-border spinner-border-sm me-2 d-none" ref={postSpinner}></span>
                                                        Post
                                                    </button>
                                                </div>

                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {reverseArr.length > 0 ?
                    reverseArr.map(i => (
                        <GetPosts i={i} currentUser={currentUser} setIsCreatedPost={setIsCreatedPost}/>
                    )
                    )
                    :
                    <div className="col-12 bg-white border rounded p-2">
                        <div className="">
                            <div className="text-center">
                                <h4 className="text-center">No more posts</h4>
                                <p className="px-1 text-center">Add more friends to see more posts in your News Feed.</p>
                                <button className="btn btn-primary">Add friend</button>

                            </div>
                        </div>

                    </div>


                }
            </div>
        </section>
    )
}

export default NewsFeed
