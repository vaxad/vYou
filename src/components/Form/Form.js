import React, { useState } from "react";
import FileBase from "react-file-base64";
import useStyles from "./style.js";
import { TextField, Typography, Button, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { createPost } from "../../actions/posts.js";
import plus from '../../images/plus.svg'

let ctr=0;

const Form = () => {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const handleSubmit = (e) => {
    if (postData.creator==='') {
      alert("fields empty")
    } else {
      e.preventDefault();
    console.log("clicked");
    dispatch(createPost(postData));
    document.getElementById('clear').click();
    }
    
  };
  const clear = () => {
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    if(ctr===1){
    document.getElementById('imageShow').click();
    }
    ctr=0;
  };

  const onChange = (e) => {
    setPostData({ ...postData, [e.target.id]: e.target.value });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    let base64=file;
    if(file){
    base64 = await convertToBase64(file);setPostData({...postData,selectedFile:base64});
    if(ctr===0){
    document.getElementById('imageShow').click();
    ctr=1;
    }

    }else{
      document.getElementById('imageShow').click();
      ctr=0;
      setPostData({...postData,selectedFile:base64});
    
    }
    
  }

  

  return (
    <>
      <div className="container w-100 mb-3">
        <button
          class="btn btn-dark w-100 mt-3 text-center rounded-pill"
          type="button"
          id="toggle"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
        ><img
            src={plus}
            height="20"
          />
        </button>
      </div>
      <div className="container">
      <div class="collapse" id="collapseExample">
        <div class="card card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="creator" className="form-label">
                Creator
              </label>
              <input
                type="text"
                className="form-control"
                id="creator"
                value={postData.creator}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={postData.title}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <input
                type="text"
                className="form-control"
                id="message"
                value={postData.message}
                onChange={onChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">
                Tags
              </label>
              <input
                type="text"
                className="form-control"
                id="tags"
                value={postData.tags}
                onChange={onChange}
              />
            </div>

            <div className="input-group mb-3">
              
              <input
                type="file"
                multiple={false}
                class="form-control my-2"
                id="inputGroupFile02"
                onChange={handleFileUpload}
              ></input>
            </div>

            <p>
            <button class="btn btn-primary" id="imageShow" hidden type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2">
    
  </button>
</p>
<div class="collapse" id="collapseExample2">
  <div class="card card-body">
    <img src={postData.selectedFile} className=" img-fluid mx-auto" alt="..." style={{maxHeight:"180px", maxWidth:"270px"}}></img>
    </div>
</div>

            <button
              type="submit"
              className="btn btn-outline-dark mb-3 rounded-pill"
              style={{ width: "100%" }}
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
            >
              Submit
            </button>
            <button
              type="reset"
              id="clear"
              value="clear"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-expanded="false"
          aria-controls="collapseExample"
              className="btn btn-outline-dark rounded-pill"
              style={{ width: "100%" }}
              onClick={clear}
            >
              Cancel
            </button>
          </form>
        </div>
        </div>
      </div>
    </>
  );
};

export default Form;
