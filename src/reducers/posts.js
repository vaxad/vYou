export default (posts=[],action)=>{
    console.log("switch")
    switch (action.type) {
        case 'FETCH_ALL':
            return action.payload;
            
        case 'CREATE':
            console.log("reached");
            return [...posts,action.payload];
            
        case 'UPDATE':
            return posts;
            
        case 'DELETE':
            return posts;
            
        default:
            return posts;
            
    }
}