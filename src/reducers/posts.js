export default (posts=[],action)=>{
    //("switch")
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
            
        case 'CREATE':
            //("reached");
            return [...posts,action.payload];
            
        case 'UPDATE':
            return posts.map((post)=>post._id===action.payload._id?action.payload:post);
            
        case 'LIKE':
            return posts.map((post)=>post._id===action.payload._id?action.payload:post);
            
        case 'DELETE':
            //("ho raha delete")
            return posts.filter((post)=>post._id!==action.payload) ;
            
        default:
            return posts;
            
    }
}