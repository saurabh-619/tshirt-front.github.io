import React from "react";
import Menu from "./Menu";

const Base = ({
  title = "My Title",
  description = "My Description",
  className = "bg-dark text-white p-0",
  children,
}) => {
  return (
    <div>
      <Menu></Menu>
      <div className="container-fluid">
        <div className="jumbotron bg-dark text-white text-center  pt-3 mb-0 pb-3">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <footer
        className="footer  bg-dark empty-auto py-3"
        style={{ display: "none" }}
      >
        <div className="container-fluid bg-success text-white text-center">
          <h4>If you got any questions ,feel free for to reach out!</h4>
          <button className="btn btn-warning btn-lg"> Contact Us</button>
          {/* <div className="container text-center">
                        <span className="text-muted">
                            An amazing place to buy T-Shirt
                        </span>
                        <h3 className="text-center text-danger">&copy; Saurabh Bomble {new Date().getFullYear} </h3>
                    </div> */}
        </div>
      </footer>
    </div>
  );
};

export default Base;
