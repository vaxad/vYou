import React, { useContext, useEffect } from "react";
import Post from "./Post/Post";
import Spinner from "../Spinner";
import postContext from "../../context/context";
import { useNavigate } from "react-router-dom";

const Posts = (props) => {
  // let ctr=0;
  const navigate=useNavigate()
  const context=useContext(postContext);
  const {posts, getPosts, setPost}=context;
  setPost(null)
  useEffect(()=>{
    if(localStorage.getItem('token')){
    getPosts();
    }else{
      navigate('/login');
    }
  },[getPosts,navigate]);
  //.log(posts);
  return posts.length===0 ? (
    <Spinner/>
  ) : (
    // <InfiniteScroll
    //       dataLength={posts.length}
    //       next={posts}
    //       hasMore={ctr!==posts.length}
    //       loader={<Spinner/>}
    //     >
    <div className="container">
      <div className="row">
        {posts.length!==0?posts.map((element) => {
          // ctr++;
          return(
            <div className="col-md-4 my-3" key={element._id}>
              <Post setId={props.setId} id={element._id} likes={element.likes} creator_id={element.creator_id} creator={element.creator} title={element.title} message={element.message} tags={element.tags} createdAt={element.date} selectedFile={element.selectedFile}/>
            </div>
          );
        }):""}
      </div>
    </div>
   // </InfiniteScroll>
  );
};

export default Posts;
