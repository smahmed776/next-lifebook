import React from "react";

const ProfImages = ({ image }) => {
  return (
    <div className="col p-1">
      <div className="border">
        <img
          src={image}
          alt={"text"}
          style={{
            height: "125px",
            width: "100%",
            padding: ".3rem",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
};

export default ProfImages;
