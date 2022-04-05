let UserApi = {

    getAllUsers(){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: headers
        };
        return fetch("http://localhost:8080/users/", requestOptions)
    },

    getUserById(uid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: headers
        };
        return fetch(`http://localhost:8080/users/${uid}`, requestOptions)
    },

    getUserByUserId(userid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: headers
        };
        return fetch(`http://localhost:8080/users/${userid}`, requestOptions)
    },

    getUserLikedPostArray(userid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: headers
        };
        return fetch(`http://localhost:8080/users/${userid}/likedposts`, requestOptions)
    },

    updateUserNameAndPhoto(uid, userData){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(userData)
        };
        return fetch(`http://localhost:8080/users/${uid}`, requestOptions)
    },

    updateUserSavedPosts(postid, userid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: headers,
        };
        return fetch(`http://localhost:8080/users/${userid}/savedposts/${postid}/save`, requestOptions); 
    },

    updateUserSavedPostsUnsave(postid, userid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: headers,
        };
        return fetch(`http://localhost:8080/users/${userid}/savedposts/${postid}/unsave`, requestOptions)
    },

    updateUserLikedPosts(postid, userid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: headers,
        };
        return fetch(`http://localhost:8080/users/${userid}/likedposts/${postid}/like`, requestOptions); 
    },

    updateUserLikedPostsUnlike(postid, userid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: headers,
        };
        return fetch(`http://localhost:8080/users/${userid}/likedposts/${postid}/unlike`, requestOptions)
    },

    createNewUser(userData){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(userData)
        };
        return fetch("http://localhost:8080/users/", requestOptions)
    }
};

export default UserApi;