import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router'
import Moment from 'react-moment'
import { Link } from 'react-router-dom'
import API from '../../../api/API'
import { LikerContext } from '../../../globalcontext/likers';
import './newsfeed.css'

const Post = ({ currentUser }) => {

    const location = useLocation()
    const search = location.search.toString().replace('?id=', '');
    const [postId, setPostId] = useState('');
    const [post, setPost] = useState([])
    const [comment, setComment] = useState("")
    const { likerState, postidState, commentsState, reqtypeState, newCommentState, reqAgainState } = useContext(LikerContext);
    const [liker, setLiker] = likerState;
    const [reqAgain, setReqAgain] = reqAgainState;
    const [comments, setComments] = commentsState;
    const [newComment, setNewComment] = newCommentState;
    const [setreqType] = reqtypeState;
    const [setPostid] = postidState;
    const [newPostArr, setNewPostArr] = useState([]);
    const commentInp = useRef(null)
    const placeholderPost = useRef(null);
    const spinner = useRef(null)

    const requestPost = async (id) => {
        try {
            if (spinner.current) { spinner.current.classList.remove('d-none') }
            if (placeholderPost.current) { placeholderPost.current.innerText = "Loading post..." }
            const option = {
                headers: {
                    "Content-Type": "application/json",
                    "Athorization": `Bearer ${id}`
                }
            }
            const res = await API.get('/post', option);
            setPost([
                res.data
            ])
        } catch (error) {
            if (spinner.current) { spinner.current.classList.add('d-none') }
            if (placeholderPost.current) { placeholderPost.current.innerText = "No Post Found!" }
            console.log(error);
        }
    };


    const likePost = async (e) => {
        e.preventDefault();
        const btn = document.getElementById(e.target.id)
        try {
            btn.setAttribute('disabled', 'true')
            const option = {
                headers: {
                    "Content-Type": "application/json",
                    "Athorization": `Bearer ${e.target.dataset.postId}`
                }
            }
            const res = await API.put('/likepost', { user_id: currentUser._id }, option);
            console.log(res)


            requestPost(e.target.dataset.postId)

            btn.removeAttribute('disabled')


        } catch (error) {
            btn.removeAttribute('disabled')
            console.log(error);
        }
    }

    const unlikePost = async (e) => {
        const btn = document.getElementById(e.target.id)
        e.preventDefault();
        try {
            btn.setAttribute('disabled', 'true')
            const option = {
                headers: {
                    "Content-Type": "application/json",
                    "Athorization": `Bearer ${e.target.dataset.postId}`
                }
            }
            const res = await API.put('/unlikepost', { user_id: currentUser._id }, option);
            console.log(res)
            requestPost(e.target.dataset.postId)
            btn.removeAttribute('disabled')


        } catch (error) {
            btn.removeAttribute('disabled')
            console.log(error.response);
        }
    }

    const deletePost = async (e) => {
        try {

            const option = {
                headers: {
                    "Content-Type": "application/json",
                    "Athorization": `Bearer ${e.target.dataset.postId}`
                }
            }

            await API.delete("/deletepost", option);

            window.location.replace('/');

        } catch (error) {
            console.log(error.response);
        }
    }




    const getLikers = e => {
        setReqAgain(!reqAgain)
        const postId = e.target.dataset.postId;
        setreqType("like");
        setPostid(postId);
    }

    const getComments = (id, strng) => {
        setReqAgain(!reqAgain)
        const commentId = id;
        setreqType("comment");
        setPostid(commentId);
        if (strng === 'true') { setNewComment(!newComment) }
    }


    const makeComment = async (e) => {
        e.preventDefault();
        const btn = document.getElementById(e.target.dataset.btnId);
        const spinner = document.getElementById(e.target.dataset.spinnerId);
        if (comment === '') {
            alert('Please write a comment')
            return false;
        }
        try {
            btn.setAttribute('disabled', 'true');
            spinner.classList.remove('d-none')
            const option = {
                headers: {
                    "Content-Type": "application/json",
                    "Athorization": `Bearer ${e.target.dataset.postId}`
                }
            }
            const body = {
                comment,
                time: new Date(),
                user_id: currentUser._id,
            }
            await API.put("/comment", body, option);
            getComments(e.target.dataset.postId, "true");
            setComment('');
            btn.removeAttribute('disabled');
            spinner.classList.add('d-none')

        } catch (error) {
            btn.removeAttribute('disabled');
            spinner.classList.add('d-none')
            console.log(error.response);
        }
    }


    useEffect(() => {
        setPostId(search)
        getComments(search, "false")
    }, [search])


    useEffect(() => {
        if (postId) {

            requestPost(postId)
        }
    }, [postId])

    useEffect(() => {
        if (post.length > 0) {
            const ob = post[0].post

            setNewPostArr([
                ob
            ])
        } else {
            console.log(post.length);
        }
    }, [post])



    return (
        <div className="row row-cols-1 mt-2">
            {newPostArr.length > 0 ? newPostArr.map(i => (

                <div className="col bg-white border rounded p-2" key={i._id} id={`post${i._id}`}>
                    <div className="">
                        <div className="d-flex justify-content-between py-1 px-1 px-sm-3">
                            <div className="d-flex justify-content-between">
                                {post[0]?.user.image ? <img src={post[0].user.image} alt="Name" className="rounded-pill statusimg me-2" alt={post[0].user.name} />
                                    : <span className="bi bi-person-circle pe-3" style={{ fontSize: "1.5rem" }}></span>}
                                <div className=" text-start">
                                    <Link to={`/profile?id=${i.user_id}`} className="mt-1 text-dark" style={{ textDecoration: "none" }}>{post[0].user.name}</Link>
                                    <p className="text-muted text-start"><Moment fromNow interval={1000}>{i.time}</Moment></p>
                                </div>
                            </div>
                            <div className="dropdown">
                                <a className="btn" style={{ padding: "0", height: "24px" }} role="button" id={`${i._id}drop`} data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="bi bi-justify"></span>
                                </a>
                                <ul class="dropdown-menu" aria-labelledby={`${i._id}drop`}>
                                    {i.user_id === currentUser._id ?
                                        <li className="dropdown-item ">
                                            <button className="btn text-white w-100 text-center bg-danger" data-bs-toggle="modal" data-bs-target={`#del${i._id}`}>Delete</button>
                                        </li>
                                        :
                                        null
                                    }

                                </ul>
                            </div>
                        </div>
                        <div className="px-3">
                            {i.post && <p className="px-1">{i.post}</p>}
                            {i.image && <img src={i.image} alt={i.name} width="100%" className="px-2" style={{ objectFit: "contain" }} />}
                        </div>


                        <div className="d-flex justify-content-between align-items-baseline px-3 px-sm-4 mt-2 postreactcount">
                            <a role="button" onClick={e => getLikers(e)} data-post-id={i._id} data-bs-toggle="modal" data-bs-target={`#modal${i._id}`} className="text-muted " style={{ textDecoration: "none" }}><span className="bi bi-hand-thumbs-up text-primary pe-2" style={{ pointerEvents: "none" }}></span>{i.reactions.likes.liker.length}</a>
                            <div>
                                <a role="button" className="text-muted" style={{ textDecoration: "none" }}><span className="pe-0 pe-sm-2">{i.reactions.comments.commentators.length}</span> Comment</a>
                                <a href="" className="text-muted ms-2" style={{ textDecoration: "none" }}><span className="pe-0 pe-sm-1">1k</span> shares</a>
                            </div>
                        </div>


                        <hr className="mt-1 mb-2 m-sm-3" />


                        <div className="d-flex justify-content-around postreact">
                            {i.reactions.likes.liker.find(t => (t === currentUser._id)) ?
                                <button data-post-id={i._id} onClick={e => unlikePost(e)} id={`unlike${i._id}`} className="btn text-primary" style={{ textDecoration: "none" }}><span className="bi bi-hand-thumbs-up-fill pe-2"></span> Liked</button>
                                :
                                <button onClick={e => likePost(e)} id={`like${i._id}`} data-post-id={i._id} className="btn text-dark" style={{ textDecoration: "none" }}><span className="bi bi-hand-thumbs-up pe-2"></span> Like</button>
                            }


                            <button data-post-id={i._id} onClick={() => commentInp.current.focus()} className="btn text-dark" style={{ textDecoration: "none" }}><span className="bi bi-chat pe-2"></span> Comment</button>
                            <button className="btn text-dark" style={{ textDecoration: "none" }}><span className="bi bi-share pe-2"></span> Share</button>


                        </div>

                        <hr className="mt-1 mb-2 m-sm-3" />

                    </div>
                    <div className="comment px-3 mt-4">
                        {comments.length > 0 ?
                            comments[0].commentators.map(i => (

                                <div className="row w-75 mb-3">


                                    <div className="col-12 d-flex flex-row justify-content-start">
                                        {comments[0].user[comments[0].user.findIndex(t => t._id === i.user_id)].image && <img src={comments[0].user[comments[0].user.findIndex(t => t._id === i.user_id)].image} alt="" className="rounded-pill" style={{ height: "35px", width: "35px" }} />}
                                        {!comments[0].user[comments[0].user.findIndex(t => t._id === i.user_id)].image && <span className="bi bi-person-circle" style={{ fontSize: '1.5rem' }}></span>}
                                        <div className="ms-3 px-2 rounded">
                                            <div className="bg-light p-2 rounded">

                                                <Link role="button" to={`/profile?id=${i.user_id}`} target="_blank" style={{ textDecoration: "none", fontWeight: "bold" }} className="text-dark">

                                                    {comments[0].user[comments[0].user.findIndex(t => t._id === i.user_id)].name}

                                                </Link>
                                                <p>{i.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                            <div className="col-12 d-flex justify-content-start" style={{fontSize: ".75rem"}}>
                                                <div className="d-flex justify-content-evenly align-items-center" style={{minWidth: "226px"}}>

                                                <p className="text-muted text-start p-0 m-0"><Moment fromNow interval={1000}>{i.time}</Moment></p>
                                                <button className="btn" style={{fontSize: ".75rem"}} href="#">like</button>
                                                <button className="btn" style={{fontSize: ".75rem"}} href="#">delete</button>
                                                </div>
                                            </div>
                                </div>

                            ))

                            :

                            <div className="d-flex justify-content-center p-4">
                                <p id={`loadcomment${i._id}`}>no comments found</p>
                            </div>
                        }
                        <div className="modal-footer justify-content-center">
                            <form className="w-100" onSubmit={e => makeComment(e)} data-btn-id={`commentbtn${i._id}`} data-spinner-id={`spinner${i._id}`} data-post-id={i._id}>
                                <div className="row w-100">
                                    <div className="col-9">
                                        <input type="text" ref={commentInp} placeholder="write a comment..." className="form-control" value={comment} onChange={e => setComment(e.target.value)} />
                                    </div>
                                    <div className="col-3">
                                        <button type="submit" className="btn btn-md btn-primary " id={`commentbtn${i._id}`}>
                                            <span className="spinner-border spinner-border-sm me-2 d-none" id={`spinner${i._id}`}></span>
                                            Comment
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>


                    {/* modal for like  */}

                    <div class="modal fade" id={`modal${i._id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`modal${i._id}Label`} aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <div className="modal-title">
                                        <h3 class="modal-title"><span className="bi bi-hand-thumbs-up-fill text-primaty me-2"></span></h3>
                                    </div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" onClick={() => setLiker([])} aria-label="Close"></button>
                                </div>
                                {liker.length > 0 ?
                                    liker[0].user.map(i => (

                                        <div class="modal-body px-1 ">
                                            <div className="row row-cols-1 w-50">

                                                <div className="col d-flex justify-content-evenly text-primary">

                                                    <img src={i.image} alt="" className="rounded-pill" style={{ height: "35px", width: "35px" }} />
                                                    <p className="text-dark">{i.name}</p>
                                                </div>

                                            </div>

                                        </div>
                                    ))

                                    :

                                    <div className="d-flex justify-content-center p-4">
                                        <p className="text-center" id={`like${i._id}`} role="status">not found</p>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>


                    {/* delete post modal  */}

                    <div class="modal fade" id={`del${i._id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby={`del${i._id}Label`} aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <div className="modal-title">
                                        <h3 class="modal-title">Confirmation</h3>
                                    </div>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body px-1 ">
                                    <p className="ps-3">Are you sure to delete this post?</p>

                                </div>

                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" class="btn btn-danger" data-post-id={i._id} onClick={e => deletePost(e)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))
                :
                <div className="col">
                    <p>
                        <span className="spinner-border spinner-border-sm me-2" ref={spinner}></span>
                        <span ref={placeholderPost}>Loading post...</span>
                    </p>
                </div>
            }
        </div>

    )
}

export default Post
