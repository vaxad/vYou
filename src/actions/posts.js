import * as api from '../api';

//action creators

export const getPosts=()=>async(dispatch)=>{
    try {
        const {data}=await api.fetchPosts();
        dispatch({type:'FETCH_ALL', payload:data});
    } catch (error) {
        //(error.message);
    }
    
}

export const createPost=(post)=>async(dispatch)=>{
    try {
        //("actions");
        const {data}=await api.createPost(post);
        dispatch({type:'CREATE', payload:data});
    } catch (error) {
        //(error.message);
    }
    
}

export const updatePost=(id, post)=>async(dispatch)=>{
    try {
        //("update actions");
        const {data}=await api.updatePost(id,post);
        dispatch({type:'UPDATE', payload:data});
    } catch (error) {
        //(error.message);
    }
    
}

export const deletePost=(id)=>async(dispatch)=>{
    try {
        //("delete actions");
        await api.deletePost(id);
        //("delete actions");
        dispatch({type:'DELETE', payload:id});
    } catch (error) {
        //(error.message);
    }
    
}

export const likePost=(id)=>async(dispatch)=>{
    try {
        console.log("like actions");
        const {data}=await api.likePost(id);
        dispatch({type:'LIKE', payload:data});
        console.log("like actions");
    } catch (error) {
        //(error.message);
    }
    
}