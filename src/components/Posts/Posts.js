import React from "react";
import Post from "./Post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import Spinner from "../Spinner";

let ctr=0;
const Posts = (props) => {
  const posts = useSelector((state) => state.posts);
  //(posts);
  return !posts.length ? (
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
        {posts.map((element) => {
          ctr++;
          return (
            
            <div className="col-md-4 my-3" key={element._id}>
              <Post setId={props.setId} id={element._id} creator={element.creator} title={element.title} message={element.message} tags={element.tags} createdAt={element.date} selectedFile={element.selectedFile}/>
            </div>
          );
        })}
      </div>
    </div>
   // </InfiniteScroll>
  );
};

export default Posts;
