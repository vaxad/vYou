import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import postContext from '../context/context';
import Spinner from './Spinner';

const Post = () => {
  let { id } = useParams();
    const location = useLocation();
    let navigate=useNavigate();
  //console.log(location.state.postId)
  const context=useContext(postContext);
  const {post, getPost, setPost}=context;
  useEffect(()=>{

    if(localStorage.getItem('token')){
        if(id){
            getPost(id);
        }else{
            navigate('/');
        }
    
    }else{
      navigate('/login');
    }
  },[]);
  //console.log(post);

  return !post ? (
    <Spinner/>
  ) : (
    <div className='container'>
        <div className='row'>
        <div className='col-8'>
        <p className='h1 fh1'>{post.title}</p>
        <p className='h6 fh1'>{post.message}</p>
        </div>
        <div className='col-4'>
        <img
            src={post.selectedFile}
            className=" img-fluid w-100"
            alt="..."
            style={{ maxHeight: "180px", borderRadius:20 }}
          ></img>
          </div>
        </div>
    </div>
  )
}

export default Post