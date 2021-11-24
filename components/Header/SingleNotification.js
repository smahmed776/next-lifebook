import React, { useEffect, useState } from "react";
import API from "../API/API";
import Link from "next/link";
import Moment from "react-moment"

const SingleNotification = ({ notify }) => {
  const [name, setName] = useState(null);

  const getIcon = (type) => {
    if (type === "like") {
      return "bi bi-hand-thumbs-up-fill text-primary pe-2";
    } else if (type === "comment") {
      return "bi bi-chat-fill text-success pe-2";
    }
  };

  const fetchUser = async () => {
    const res = await API.get("/userinfo", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${notify.buddy_id[0]} ${notify.buddy_id[1]}`,
      },
    });
    setName(res.data.users);
    console.log(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, [notify]);
  if(!name){
      return(
        <li>
        <a className="row p-3 w-100">
          <span className="placeholder text-dark col-12 me-2"></span>
          <span className="placeholder text-dark col-12 me-2 my-2"></span>
        </a>
      </li>
      )
  }
  return (
    <li className="px-3 border-bottom" key={notify} >
      <div className="d-flex flex-column">
        <div className="mt-2">
          {
            <p className="notification-para mb-0 pb-0">
              <span className={`${getIcon(notify.type)}`}></span>
             {notify.buddy_id.length === 1 && `${name[0].name.firstName} ${name[0].name.lastName} has`}
              {notify.buddy_id.length == 2 && `${name[0].name.firstName} ${name[0].name.lastName} and ${name[1].name.firstName} ${name[1].name.lastName}`}
              {notify.buddy_id.length > 2 &&
                `${name[0].name.firstName}, ${name[1].name.firstName} and ${
                  notify.buddy_id.length - 2
                } others `}
              {notify.type === "like" && " liked your "}
              {notify.type === "comment" && " commented on your "} 
              <Link
                href={`/post/${notify.post_id}`}
                style={{ paddingLeft: ".5rem", textDecoration: "none" }}
              >
                Post
              </Link>
            </p>
          }
        </div>
        <div className="d-flex justify-content-end mt-2">
          <p className="text-muted">
            <Moment fromNow interval={1000}>
              {notify.created}
            </Moment>
          </p>
        </div>
      </div>
    </li>
  );
};

export default SingleNotification;
