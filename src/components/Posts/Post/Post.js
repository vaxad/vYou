import React, { useContext, useState } from "react";
import heart from "../../../images/heart.png";
import redHeart from "../../../images/likedHeart.png";
import share from "../../../images/share.svg";
import ellipsis from "../../../images/ellipsis-solid.svg";
import { useLocation, useNavigate } from "react-router-dom";
import postContext from "../../../context/context";
import Spinner from "../../Spinner";

const Post = (props) => {
 // const // = useDispatch();
 const location = useLocation();
  //.log('location', location)
  let navigate=useNavigate();
  
  const context=useContext(postContext);
  const {likePost, dislikePost,me, deletePost}=context;
  const [likes,setLikes]=useState(props.likes.length);
  const [like,setLike]=useState(props.likes.includes(me._id)?redHeart:heart);
  const handleLike=(id)=>{
    if(like===redHeart){
      setLikes(likes-1)
      setLike(heart);
      dislikePost(id);
    }else{
      setLikes(likes+1)
      likePost(id)
   setLike(redHeart);
    }
  }
  

  const handleDelete=(id)=>{
    (deletePost(id));
  }
  return !me ? (
    <Spinner/>
  ) : (
    <div>
      <div className="card" style={{borderRadius:"2em"}} >
        <div className="mx-2 px-2" style={{backfaceVisibility:'hidden', marginBottom:10, marginTop:10}} >
          <div className="d-flex justify-content-between">
            <strong className="mx-2 fh1">ⓥ{props.creator}</strong>
            <div>
              <span className="badge text-bg-dark mx-4 fh1">{props.tags}</span>
              <div className="btn-group dropend">
                <img
                  src={ellipsis}
                  height="20"
                  className="dropdown-toggle mr-2"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  alt=""
                  style={{ cursor: "pointer" }}
                // onClick={()=>{
                //   props.setId(props.id);
                // }}
                ></img>
                {props.creator_id===me._id?
                (<ul className="dropdown-menu">
                  <li>
                    <p
                      className="dropdown-item"
                      onClick={()=>window.open(`/post/${props.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      Open in New Tab
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item"
                      onClick={() => {
                        props.setId(props.id);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      Edit
                    </p>
                  </li>
                  <li>
                    <p
                      className="dropdown-item text-danger"
                      onClick={() => {handleDelete(props.id)}}
                      style={{ cursor: "pointer" }}
                    >
                      Delete
                    </p>
                  </li>
                </ul>):(<ul className="dropdown-menu">
                  <li>
                    <p
                      className="dropdown-item"
                      onClick={()=>window.open(`/post/${props.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      Open in New Tab
                    </p>
                  </li>
                  {/* <li>
                    <p
                      className="dropdown-item text-danger"
                      onClick={() => {handleDelete(props.id)}}
                      style={{ cursor: "pointer" }}
                    >
                      yes
                    </p>
                  </li> */}
                </ul>)}
              </div>
            </div>
          </div>
        </div>
        <div onClick={()=>{navigate(`/post/${props.id}`)}} style={{cursor:'pointer'}}>
        <div> 
          <img
            src={props.selectedFile}
            className=" img-fluid w-100"
            alt="..."
            style={{ maxHeight: "180px" }}
          ></img>
        </div>
        <div className="card-body">
          <h5 className="card-title fh2">
            {props.title.length > 30
              ? props.title.slice(0, 18) + "..."
              : props.title}
          </h5>
          <p className="card-text fh3">
            {props.message.length > 40
              ? props.message.slice(0, 40) + "..."
              : props.message}
          </p>
          {/* <a href="#" className="btn btn-dark w-100">
            Read more
          </a> */}
          <div className="d-flex justify-content-between">
            <em className="d-flex" style={{ flexFlow: "row nowrap" }}>
              <img src={like} alt="like" height="25" onClick={(e)=>{
                e.stopPropagation();
                handleLike(props.id);
                }} style={{ cursor: "pointer"}}></img>
              <p className="mx-2">{likes}</p>
            </em>

            <em className="d-flex" style={{ flexFlow: "row nowrap" }}>
              <img alt="share" src={share} height="20" onClick={(e)=>{
                e.stopPropagation();
                navigator.clipboard.writeText(`${window.location.origin}/post/${props.id}`)
                }} style={{ cursor: "pointer" }}></img>
            </em>
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          <h6 className="mx-2 fh2">{new Date(props.createdAt).toDateString()}</h6>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Post;
