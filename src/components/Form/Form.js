import React, { useContext, useEffect, useState } from "react";
// import useStyles from "./style.js";
import plus from '../../images/plus.svg';
import postContext from "../../context/context.js";

let ctr = 0;
const Form = (props) => {

  // const classes = useStyles();
  // const dispatch = useDispatch();

  const context = useContext(postContext);
  const { addPost, addPost2, editPost, posts, getPosts } = context;
  // const {me, getMe}=context;

  // useEffect(()=>{
  //   if(localStorage.getItem('token')){
  //   getMe();
  //   }else{

  //   }
  // },[getMe]);

  const [postData, setPostData] = useState({
    creator: props.me ? props.me.name : "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const [file, setFile] = useState(null);

  console.log(posts);
  const post = posts ? posts.find((p) => p._id === props.id) : null;

  const [submit, setSubmit] = useState('Post');

  useEffect(() => {
    if (post) {
      console.log(post);
      window.scroll(0, 0);
      setSubmit('Update')
      //("edit");
      if (ctr === 0) { document.getElementById('toggle').click(); }
      setPostData(post);
      props.setId(null);
    }
  }, [post, props])

  const handleSubmit = async (e) => {
    if (postData.creator === '') {
      if (props.me) {
        console.log(props.me)
        setPostData({ ...postData, creator: props.me.name });
      } else {
        console.log("fields empty")
      }
    } else {
      e.preventDefault();
      //("clicked");
      if (postData._id) {
        // dispatch(updatePost(props.id,postData));

        await editPost(postData)
        setSubmit('Submit');
      } else {
        console.log(postData)
        e.preventDefault();
        // await addPost2(postData, file)
        await addPost(postData);

        await getPosts();
        // window.location.reload(false);
        // console.log(postData)
        // dispatch(createPost(postData));
      }
      clear();
      // document.getElementById('clear').click();
    }

  };
  const clear = () => {
    setSubmit('Post');
    props.setId(null)
    setPostData({
      creator: props.me ? props.me.name : "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
    // if(ctr===1){
    // document.getElementById('imageShow').click();
    // }
    ctr = 0;
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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }






  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    let base64 = file;
    if (file) {
      base64 = await convertToBase64(file); setPostData({ ...postData, selectedFile: base64 });
      if (ctr === 0) {
        document.getElementById('imageShow').click();
        ctr = 1;
      }

    } else {
      document.getElementById('imageShow').click();
      ctr = 0;
      setPostData({ ...postData, selectedFile: base64 });

    }

  }


  return (
    <>
      <div className={`container w-100 mb-3`}>
        <button
          className="btn btn-dark w-100 mt-3 text-center rounded-pill"
          type="button"
          id="toggle"
          onClick={() => { ctr = ctr === 0 ? 1 : 0 }}
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-controls="collapseExample"
        // style={{"backgroundColor":"#BE4CFF"}}
        ><img
            src={plus}
            alt=""
            height="20"
          />
        </button>
      </div>
      <div className={`container`}>
        <div className="collapse" id="collapseExample">
          <div className={`card card-body`} > {/*style={{"backgroundColor":"#BE4CFF","backgroundImage":"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpolygon fill='%23a244d6' points='1600 160 0 460 0 350 1600 50'/%3E%3Cpolygon fill='%23873cad' points='1600 260 0 560 0 450 1600 150'/%3E%3Cpolygon fill='%236b3384' points='1600 360 0 660 0 550 1600 250'/%3E%3Cpolygon fill='%23502b5b' points='1600 460 0 760 0 650 1600 350'/%3E%3Cpolygon fill='%23342332' points='1600 800 0 800 0 750 1600 450'/%3E%3C/g%3E%3C/svg%3E\")","backgroundSize":"cover"}}> */}
            <form onSubmit={handleSubmit}>
              {/* <div className="mb-3">
              <label htmlFor="creator" className="form-label fh3">
                Creator
              </label>
              <input
                type="text"
                className="form-control"
                id="creator"
                value={postData.creator}
                onChange={onChange}
              />
            </div> */}
              <div className="mb-3">
                <label htmlFor="title" className="form-label fh3">
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
                <label htmlFor="message" className="form-label fh3">
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
                <label htmlFor="tags" className="form-label fh3">
                  Tags
                </label>
                <input
                  type="text"
                  className="form-control fh3"
                  id="tags"
                  value={postData.tags}
                  onChange={onChange}
                />
              </div>

              <div className="input-group mb-3">

                <input
                  type="file"
                  multiple={false}
                  className="form-control my-2 fh3"
                  id="inputGroupFile02"
                  onChange={
                    // handleFileChange
                    handleFileUpload
                  }
                ></input>
              </div>

              <p>
                <button className="btn btn-primary fh3" id="imageShow" hidden type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample2">

                </button>
              </p>
              <div className="collapse" id="collapseExample2">
                <div className="card card-body">
                  <img src={postData.selectedFile} className=" img-fluid mx-auto" alt="..." style={{ maxHeight: "180px", maxWidth: "270px" }}></img>
                </div>
              </div>

              <button
                type="submit"
                className="btn btn-outline-dark mb-3 rounded-pill fh3"
                style={{ width: "100%" }}
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                {submit}
              </button>
              <button
                type="reset"
                id="clear"
                value="clear"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
                className="btn btn-outline-dark rounded-pill fh3"
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
