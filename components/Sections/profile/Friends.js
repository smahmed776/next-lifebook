import React from "react";
import Link from "next/link"

const Friends = ({obj}) => {
  return (
    <div className="col p-1" >
      <div className="border">
        <img
          src={obj.image}
          alt={`${obj.name.firstName}`}
          style={{
            height: "125px",
            width: "100%",
            objectFit: "cover",
          }}
        />
        <div className="w-100 p-2">
          <Link passHref href={`/profile/${obj.id}`}>
            <a
              className="p-2 text-dark text-center w-100"
              target="_blank"
              style={{ textDecoration: "none" }}
            >{`${obj.name.firstName} ${obj.name.lastName}`}</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Friends;
