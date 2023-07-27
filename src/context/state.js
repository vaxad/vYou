
import { useState } from "react";
import postContext from "./context";

const PostState = (props) => {
  const url = "https://vyou.onrender.com";
  const postsInitial =[];

  const [posts, setPosts] = useState(postsInitial);
  const [post, setPost] = useState(null);
  const [me, setMe] = useState(null);

  const getPosts =async () => {
    const response = await fetch(`${url}/posts/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json=await response.json();
    
    setPosts(json);
  }

  const getPost =async (id) => {
    const response = await fetch(`${url}/posts/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json=await response.json();
    
    setPost(json);
  }

  const likePost =async (id) => {
    const response = await fetch(`${url}/posts/like/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json=await response.json();
    
    setPost(json);
  }

  const dislikePost =async (id) => {
    const response = await fetch(`${url}/posts/dislike/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json=await response.json();
    
    setPost(json);
  }


  const addPost =async (newpost) => {
    console.log(newpost)
    const response = await fetch(`${url}/posts/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(newpost)
    });

    const post = await response.json();
    setPosts(posts.concat(post));
    
  }

  const deletePost = async (id) => {
    const response = await fetch(`${url}/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    // eslint-disable-next-line
    const json = await response.json();
  
    const newPosts = posts.filter((post) => { return post._id !== id });
    setPosts(newPosts);
  }

  const editPost = async (editedPost) => {
    const response = await fetch(`${url}/posts/${editedPost._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify(editedPost)
    });
    // eslint-disable-next-line
    const jsonData = await response.json();

    let newPosts=JSON.parse(JSON.stringify(posts));
    for (let index = 0; index < newPosts.length; index++) {
      //const element = posts[index];
      if (newPosts[index]._id === editedPost._id) {
        // newPosts[index].title = editedPost.title;
        // newPosts[index].message = editedPost.message;
        // newPosts[index].tags = editedPost.tags;
        newPosts[index]=editedPost;
        break;
      }
    }
    setPosts(newPosts);
  }

  const getMe =async () => {
    const response = await fetch(`${url}/auth/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    const json=await response.json();
    setMe(json);
  }

  return (
    <postContext.Provider value={{ posts, me, post ,addPost, deletePost, editPost, getPosts, getMe, setPost, getPost, likePost, dislikePost}}>
      {props.children}
    </postContext.Provider>
  )
}

export default PostState;