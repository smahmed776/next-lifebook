import React from "react";

const Statistics = ({ title, count, icon, iconBg, increasing, decreasing }) => {
  return (
    <div className="col">
      <div className="border shadow bg-white d-flex flex-column justify-content-center align-items-center p-3 w-100 rounded ">
        <div className="d-flex flex-column-reverse flex-lg-row column-reverse justify-content-around align-items-center w-100 p-3 stat_title">
          <div>
            <p className="text-muted">{title}</p>
            <h1>{count}</h1>
          </div>

          <div
            className={`${iconBg} text-white rounded-pill d-flex justify-content-center align-items-center mb-3`}
            style={{ height: "100px", width: "100px" }}
          >
            <span
              className={`${icon} pb-3`}
              style={{ fontSize: "3rem" }}
            ></span>
          </div>
        </div>
        {increasing && (
          <div className="d-flex justify-content-center">
            <p className="text-success bi bi-arrow-up">{" 12% this month"}</p>
          </div>
        )}
        {decreasing && (
          <div className="d-flex justify-content-center">
            <p className="text-danger bi bi-arrow-down">{" -12% this month"}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Statistics;
