let PostApi = {

    getAllPosts(){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: headers
        };
        return fetch("http://localhost:8080/posts/", requestOptions)
    },

    getPostsByUid(uid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: headers
        };
        return fetch(`http://localhost:8080/posts/${uid}`, requestOptions)
    },

    getPostLikesRetweetsCommentsSaves(postid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: headers
        };
        return fetch(`http://localhost:8080/posts/${postid}/likesretweetscommentssaves`, requestOptions)
    },

    updatePostsLikes(postid, uid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: headers,
        };
        return fetch(`http://localhost:8080/posts/${postid}/likes/${uid}`, requestOptions)
    },

    createNewPost(postData){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(postData)
        };
        return fetch("http://localhost:8080/posts/", requestOptions)
    }
};

export default PostApi;