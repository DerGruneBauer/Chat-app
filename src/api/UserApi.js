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