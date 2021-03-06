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

    getPostsByUserId(userid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: headers
        };
        return fetch(`http://localhost:8080/posts/users/${userid}`, requestOptions)
    },

    getPostsByUid(uid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: headers
        };
        return fetch(`http://localhost:8080/posts/users/uid/${uid}`, requestOptions)
    },

    getPostsByPostId(postid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: headers
        };
        return fetch(`http://localhost:8080/posts/${postid}`, requestOptions)
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

    updatePostsSaves(postid, uid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: headers,
        };
        return fetch(`http://localhost:8080/posts/${postid}/saves/${uid}`, requestOptions)
    },

    updatePostsSavesUnsave(postid, uid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: headers,
        };
        return fetch(`http://localhost:8080/posts/${postid}/saves/${uid}/unsave`, requestOptions)
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

    updatePostsLikesUnlike(postid, uid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: headers,
        };
        return fetch(`http://localhost:8080/posts/${postid}/likes/${uid}/unlike`, requestOptions)
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