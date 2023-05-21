import React, { useEffect, useState } from "react";
import heart from "../../../images/heart-solid.svg";
import redHeart from "../../../images/likedHeart.svg";
import share from "../../../images/share.svg";
import ellipsis from "../../../images/ellipsis-solid.svg";
import Vignette from "@hypersprite/react-vignette";
import { useDispatch } from "react-redux";
import { deletePost, likePost } from "../../../actions/posts";

const Post = (props) => {
  const dispatch = useDispatch();
  const [like,setLike]=useState(heart);
  const handleLike=(id)=>{
    console.log("like")
   dispatch(likePost(id));
   setLike(redHeart);
  }
  

  const handleDelete=(id)=>{
    dispatch(deletePost(id));
  }
  return (
    <div>
      <div className="card" style={{borderRadius:"2em"}}>
        <div className="card-header">
          <div className="d-flex justify-content-between">
            <strong className="mx-2">ⓥ{props.creator}</strong>
            <div>
              <span className="badge text-bg-dark mx-4">{props.tags}</span>
              <div className="btn-group dropend">
                <img
                  src={ellipsis}
                  height="20"
                  className="dropdown-toggle mr-2"
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
              
              <img src={like} height="20" onClick={()=>{handleLike(props.id)}} style={{ cursor: "pointer", color:"#ff0033" }}></img>
              <p className="mx-2">{props.likes}</p>
            </em>

            <em className="d-flex" style={{ flexFlow: "row nowrap" }}>
              <img src={share} height="20" style={{ cursor: "pointer" }}></img>
            </em>
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          <h6 className="mx-2">{new Date(props.createdAt).toDateString()}</h6>
        </div>
      </div>
    </div>
  );
};

export default Post;
