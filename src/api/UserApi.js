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

    getUserSavedPostArray(userid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: headers
        };
        return fetch(`http://localhost:8080/users/${userid}/savedposts`, requestOptions)
    },

    getUserFollowingArray(userid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: headers
        };
        return fetch(`http://localhost:8080/users/${userid}/following`, requestOptions)
    },

    getUserFollowersArray(userid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'GET',
            headers: headers
        };
        return fetch(`http://localhost:8080/users/${userid}/followers`, requestOptions)
    },

    updateUserInformation(uid, userData){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(userData)
        };
        return fetch(`http://localhost:8080/users/${uid}`, requestOptions)
    },

    updateUserFollowersSave(useridother, userid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: headers,
        };
        return fetch(`http://localhost:8080/users/${userid}/followers/${useridother}/save`, requestOptions); 
    },

    updateUserFollowingSave(useridother, userid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: headers,
        };
        return fetch(`http://localhost:8080/users/${userid}/following/${useridother}/save`, requestOptions); 
    },

    updateUserFollowingUnsave(useridother, userid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: headers,
        };
        return fetch(`http://localhost:8080/users/${userid}/following/${useridother}/unsave`, requestOptions)
    },

    updateUserFollowersUnsave(useridother, userid){
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        var requestOptions = {
            method: 'PUT',
            headers: headers,
        };
        return fetch(`http://localhost:8080/users/${userid}/followers/${useridother}/unsave`, requestOptions)
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