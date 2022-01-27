let ImageApi = {

    uploadNewImage() {

    },

    testFetchCall() {
        let headers = new Headers();
        headers.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'GET',
            headers: headers
        };

        return fetch(`http://localhost:8080`, requestOptions)
    }
};

export default ImageApi;