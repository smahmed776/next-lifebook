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
              className="p-2 text-dark text-center w-100 d-flex justify-content-center align-items-center"
              target="_blank"
              style={{ textDecoration: "none" }}
            >{`${obj.name.firstName} ${obj.name.lastName}`}
                  {obj.verified === true && <span className="bi bi-check rounded-pill d-inline-flex ms-2 justify-content-center align-items-center p-2 text-white bg-primary" style={{height: "15px", width: "15px"}}></span>}
            
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Friends;
