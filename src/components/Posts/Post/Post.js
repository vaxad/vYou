import React from "react";
import heart from "../../../images/heart-solid.svg";
import share from "../../../images/share.svg";
import ellipsis from "../../../images/ellipsis-solid.svg";
import Vignette from "@hypersprite/react-vignette";
import { useDispatch } from "react-redux";
import { deletePost } from "../../../actions/posts";

const Post = (props) => {
  const dispatch = useDispatch();

  const handleDelete=(id)=>{
    dispatch(deletePost(id));
  }
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <strong>ⓥ{props.creator}</strong>
            <div>
              <span className="badge text-bg-dark mx-3">{props.tags}</span>
              <div className="btn-group dropend">
                <img
                  src={ellipsis}
                  height="20"
                  className="dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{ cursor: "pointer" }}
                // onClick={()=>{
                //   props.setId(props.id);
                // }}
                ></img>

                <ul className="dropdown-menu">
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={() => {
                        props.setId(props.id);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Edit
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item text-danger"
                      onClick={() => {handleDelete(props.id)}}
                      style={{ cursor: "pointer" }}
                    >
                      Delete
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            src={props.selectedFile}
            className=" img-fluid w-100"
            alt="..."
            style={{ maxHeight: "180px" }}
          ></img>
        </div>
        <div className="card-body">
          <h5 className="card-title">
            {props.title.length > 30
              ? props.title.slice(0, 18) + "..."
              : props.title}
          </h5>
          <p className="card-text">
            {props.message.length > 40
              ? props.message.slice(0, 40) + "..."
              : props.message}
          </p>
          {/* <a href="#" className="btn btn-dark w-100">
            Read more
          </a> */}
          <div className="d-flex justify-content-between">
            <em className="d-flex" style={{ flexFlow: "row nowrap" }}>
              <img src={heart} height="20"></img>
              <p className="mx-2">2,3443</p>
            </em>

            <em className="d-flex" style={{ flexFlow: "row nowrap" }}>
              <img src={share} height="20"></img>
            </em>
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {new Date(props.createdAt).toDateString()}
        </div>
      </div>
    </div>
  );
};

export default Post;
