import React, { useContext, useEffect, useState } from 'react'
import Moment from 'react-moment';
import Link from "next/link";
import API from "../API/API";
import { NotificationContext } from '../../globalcontext/isLogged';

const Notification = ({ currentUser }) => {

    const [getNotification, setGetNotification] = useContext(NotificationContext)
    const [notificationCount, setNotificationCount] = useState("");
    const [notarray, setNotArray] = useState([]);
    const [reverseNotif, setReverseNotif] = useState([]);


    const getIcon = (type) => {
        if (type === "like") {
            return "bi bi-hand-thumbs-up-fill text-primary pe-2"
        } else if (type === 'comment') {
            return "bi bi-chat-fill text-success pe-2"
        }
    }






    const readNotification = async () => {
        setNotificationCount('');
        try {
            const option = {
                headers: {
                    "Content-Type": "application/json",
                    "Athorization": `Bearer ${currentUser._id}`
                }
            }
            await API.put('/readnotification', {}, option);
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(()=> {
        if(getNotification.length > 0){
          let arr =  [...getNotification[0]?.read]
          arr.reverse()
          setReverseNotif([
              ...arr,
          ])
        }
    }, [getNotification])

    useEffect(() => {

        setNotificationCount(getNotification[0]?.unread.length)
    }, [getNotification])

    return (
        <div className="d-block border  px-xl-2 bg-light rounded-pill position-relative dropdown" style={{ height: "45px", width: "45px" }}>

            <a className="nav-link d-flex justify-content-center align-items-center p-0 h-100 w-100"
                id="notificationdrop"
                role="button"
                data-bs-toggle="dropdown"
                aria-aria-expanded="false"
                onClick={() => readNotification()}
            >
                <span className="bi bi-bell" style={{ fontSize: "1.5rem", paddingTop: "0" }}></span></a>
            {notificationCount ? <div className="rounded-pill bg-danger text-white position-absolute d-flex align-items-center justify-content-center" style={{ top: "-8px", right: "-10px", height: "25px", width: "25px" }}>
                <span>{notificationCount}</span>
            </div> : null}
            <ul className="dropdown-menu notify-dropdown px-2" aria-aria-labelledby="notificationdrop">
                {
                    getNotification[0]?.unread.length > 0 ? getNotification[0].unread.map(i => (
                        <li className="dropdown-item border-bottom bg-light">
                            <div className="d-flex flex-column">
                                <div className="mt-2">
                                    {i.message?
                                     <p>{i.message}</p> 
                                    :
                                    <p className="notification-para px-2 mb-0 pb-0">
                                    <span className={`${getIcon(i.react_type)}`}></span>
                                    <b> {i.buddy_name} </b>
                                    {i.buddy_id.length == 1 && `${i.reacted_user[0].name} has `}
                                    {i.buddy_id.length == 2 && `${i.reacted_user[0].name} and ${i.reacted_user[1].name} `} 
                                    {i.reacted_user.length > 2 && `${i.reacted_user[0].name}, ${i.reacted_user[1].name} and ${i.reacted_user.length - 2} others `} 
                                    {i.react_type === "like" && "liked"}{i.react_type === 'comment' && 'commented on'} your
                                    <Link href={`/post?id=${i.post_id}`} style={{ paddingLeft: ".5rem", textDecoration: "none" }}>Post</Link>
                                    </p>
                                    }
                                </div>
                                <div className="d-flex justify-content-end mt-2">
                                    <p className="text-muted">
                                        <Moment fromNow interval={1000}>{i.time}</Moment>
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))
                        :
                       null
                }
                {
                    reverseNotif.length > 0 ? reverseNotif.map(i => (
                        <li className="dropdown-item border-bottom">
                            <div className="d-flex flex-column">
                                <div className="mt-2">
                                    {i.message?
                                     <p>{i.message}</p>
                                    :
                                    <p className="notification-para px-2 mb-0 pb-0">
                                    <span className={`${getIcon(i.react_type)}`}></span>
                                    <b> {i.buddy_name} </b>
                                    {i.reacted_user.length == 1 && `${i.reacted_user[0].name} has `}  
                                    {i.reacted_user.length == 2 && `${i.reacted_user[0].name} and ${i.reacted_user[1].name} `}  
                                    {i.reacted_user.length > 2 && `${i.reacted_user[0].name}, ${i.reacted_user[1].name} and ${i.reacted_user.length - 2} others `} 
                                    {i.react_type === "like" && "liked"}{i.react_type === 'comment' && 'commented on'} your
                                    <Link href={`/post?id=${i.post_id}`} style={{ paddingLeft: ".5rem", textDecoration: "none" }}>Post</Link>
                                    </p>
                                    }
                                </div>
                                <div className="d-flex justify-content-end mt-2">
                                    <p className="text-muted">
                                        <Moment fromNow interval={1000}>{i.time}</Moment>
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))
                        :
                        <li className="dropdown-item">
                            <p className="p-2">No notification found!</p>
                        </li>
                }
            </ul>

        </div>
    )
}

export default Notification
