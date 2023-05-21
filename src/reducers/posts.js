export default (posts=[],action)=>{
    console.log("switch")
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
            
        case 'CREATE':
            console.log("reached");
            return [...posts,action.payload];
            
        case 'UPDATE':
            return posts.map((post)=>post._id===action.payload.id?action.payload.post:post);
            
        case 'DELETE':
            return posts;
            
        default:
            return posts;
            
    }
}